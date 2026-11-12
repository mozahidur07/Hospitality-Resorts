import crypto from "crypto";

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

/**
 * Creates an official order on Razorpay servers via REST API
 *
 * @param {object} params
 * @param {number} params.amount - In main currency unit (e.g. 9500 INR)
 * @param {string} [params.currency='INR']
 * @param {string} [params.receipt]
 * @param {object} [params.notes]
 * @returns {Promise<object>}
 */
export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt,
  notes = {},
}) {
  if (!RAZORPAY_KEY || !RAZORPAY_SECRET) {
    throw new Error("RAZORPAY_KEY or RAZORPAY_SECRET is missing from environment.");
  }

  const targetCurrency = (currency || "INR").toUpperCase();
  // Zero-decimal currencies like JPY do not have subunits
  const isZeroDecimal = ["JPY", "KRW"].includes(targetCurrency);
  const amountInSubunits = isZeroDecimal
    ? Math.round(Number(amount))
    : Math.round(Number(amount) * 100);

  const authHeader = `Basic ${Buffer.from(`${RAZORPAY_KEY}:${RAZORPAY_SECRET}`).toString("base64")}`;

  const payload = {
    amount: amountInSubunits,
    currency: targetCurrency,
    receipt: receipt || `rcpt_${Date.now().toString().slice(-8)}`,
    notes,
  };

  let response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
    body: JSON.stringify(payload),
  });

  let data = await response.json();

  // If Razorpay rejects because international multi-currency processing is disabled
  // on this specific merchant account, convert to proper real-world INR forex value so user is not undercharged
  if (!response.ok && targetCurrency !== "INR") {
    console.warn(
      `[Razorpay Multi-currency fallback]: ${data.error?.description || "Non-INR rejected"}. Converting to standard INR market value.`
    );
    const FOREX_RATES_TO_INR = {
      USD: 85,
      EUR: 92,
      GBP: 108,
      CHF: 95,
      AED: 23,
      CAD: 62,
      AUD: 55,
      SGD: 64,
      JPY: 0.56,
    };
    const rate = FOREX_RATES_TO_INR[targetCurrency] || 85;
    const inrTotal = Math.round(Number(amount) * rate);

    const fallbackPayload = {
      amount: inrTotal * 100,
      currency: "INR",
      receipt: payload.receipt,
      notes: {
        ...notes,
        originalAmount: `${amount} ${targetCurrency}`,
        conversionRate: `1 ${targetCurrency} = ₹${rate}`,
      },
    };

    response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(fallbackPayload),
    });
    data = await response.json();
  }

  if (!response.ok) {
    console.error("[Razorpay Order Error]:", data);
    throw new Error(data.error?.description || "Failed to create Razorpay payment order.");
  }

  return data;
}

/**
 * Cryptographically verifies Razorpay payment signature
 *
 * @param {object} params
 * @param {string} params.orderId - razorpay_order_id
 * @param {string} params.paymentId - razorpay_payment_id
 * @param {string} params.signature - razorpay_signature
 * @returns {boolean}
 */
export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  if (!RAZORPAY_SECRET) {
    console.warn("[Razorpay Verify Warning]: RAZORPAY_SECRET missing.");
    return false;
  }

  if (!orderId || !paymentId || !signature) {
    return false;
  }

  try {
    const generated = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    return generated === signature;
  } catch (err) {
    console.error("[Signature Verification Error]:", err);
    return false;
  }
}

