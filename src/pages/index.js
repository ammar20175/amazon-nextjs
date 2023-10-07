import Header from "@/components/Header";
import Head from "next/head";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Amazon</title>
			</Head>

			{/* Header */}
			<Header />
		</div>
	);
}
