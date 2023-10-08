import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../../permissions.json");

const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
	  })
	: admin.app();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fullfillOrder = async (session) => {
	return app
		.firestore()
		.collection("users")
		.doc(session.metadata.email)
		.collection("orders")
		.doc(session.id)
		.set({
			amount: session.amount_subtotal / 100,
			amount_Shipping: session.shipping_cost.amount_total / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
		})
		.catch((error) => {
			console.log("error from webhook", error);
		});
};

export default async (req, res) => {
	if (req.method === "POST") {
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers["stripe-signature"];

		let event;

		//verify that the event came from stripe

		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (error) {
			console.log("ERROR", error.message);
			return res.status(400).send(`Webhook error: ${error.message}`);
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object;

			// console.log("this is session", session);

			//fullfill the order
			return fullfillOrder(session)
				.then(() => res.status(200))
				.catch((error) => {
					console.log(error, "under");
					res.status(400).send(`Webhook error: ${error.message}`);
				});
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
