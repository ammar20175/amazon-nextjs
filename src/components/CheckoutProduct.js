import { addToBasket, removeFromBasket } from "@/slices/basketSlice";
import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";

function CheckoutProduct({
	id,
	title,
	price,
	description,
	category,
	image,
	rating,
	hasPrime,
}) {
	const dispatch = useDispatch();

	const addItemToBasket = () => {
		const product = {
			id,
			title,
			price,
			description,
			category,
			image,
			rating,
			hasPrime,
		};

		dispatch(addToBasket(product));
	};

	const removeItemFromBasket = () => {
		dispatch(removeFromBasket({ id }));
	};

	return (
		<div className="grid grid-cols-5">
			<Image src={image} height={200} width={200} objectFit="contain" />

			{/* middle */}
			<div className="col-span-3 mx-5">
				<p>{title}</p>
				<div className="flex">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<StarIcon key={i} className="h-5 text-yellow-500" />
						))}
				</div>
				<p className="text-xs my-2 line-clamp-3">{description}</p>
				<Currency quantity={price} currency="PKR" />

				{hasPrime && (
					<div className="flex items-center space-x-2">
						<img
							loading="lazy"
							src="https://m.media-amazon.com/images/G/01/support_images/GUID-3E96EF4C-2DCB-4B52-872B-3876095AC1F0=4=en-IN=Normal.png"
							alt="img"
							className="w-12"
						/>
						<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
					</div>
				)}
			</div>

			{/* right add/remove buttons */}
			<div className="flex flex-col space-y-2 my-auto justify-self-end">
				<button onClick={addItemToBasket} className="button">
					Add to Basket
				</button>
				<button onClick={removeItemFromBasket} className="button">
					Remove from Basket
				</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;
