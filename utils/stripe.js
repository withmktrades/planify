import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
export const redirectToCheckout = async (price) => {
  const stripe = await stripePromise;
  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price, quantity: 1 }],
    mode: 'payment',
    successUrl: window.location.origin + '/success',
    cancelUrl: window.location.origin + '/cancel',
  });
  if (error) alert(error.message);
};