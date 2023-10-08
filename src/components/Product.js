import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "@/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
	const [rating, setRating] = useState(0);
	const [hasPrime, setHasPrime] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		const randomRating =
			Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING;

		setRating(randomRating);
		setHasPrime(Math.random() < 0.5);
	}, []);

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

	return (
		<div className="relative flex flex-col m-5 bg-white p-10 z-30 ">
			<p className="absolute top-2 right-2 text-xs italic text-gray-400">
				{category}
			</p>

			<Image src={image} height={200} width={200} objectFit="contain" />

			<h4 className="my-3 line-clamp-2">{title}</h4>

			<div className="flex">
				{Array(rating)
					.fill()
					.map((_, i) => (
						<StarIcon className="h-5 text-yellow-500" />
					))}
			</div>

			<p className="text-xs my-2 line-clamp-2">{description}</p>

			<div className="mb-5">
				<Currency quantity={price} currency="PKR" />
			</div>

			{hasPrime && (
				<div className="flex items-center space-x-2 -mt-4 mb-2">
					<img
						className="w-12"
						src="https://m.media-amazon.com/images/G/01/support_images/GUID-3E96EF4C-2DCB-4B52-872B-3876095AC1F0=4=en-IN=Normal.png"
						alt="iamge"
					/>
					<p className="text-xs text-gray-500">FREE Next-day Delivery</p>
				</div>
			)}

			<button onClick={addItemToBasket} className="mt-auto button">
				Add to Basket
			</button>
		</div>
	);
}

export default Product;
