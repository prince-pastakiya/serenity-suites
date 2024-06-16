import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { safeListings, SafeUser } from "../types";

interface FavoriteClientProps {
	listings: safeListings[];
	currentUser?: SafeUser;
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
	listings,
	currentUser,
}) => {
	return (
		<Container>
			<Heading title="Favorites" subtitle="Your Favorite Places!!" />
			<div
				className="mt-10 grid grip-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 xl:grid-cols-5
            2xl:grid-cols-6 gap-8">
				{listings.map((listing) => (
					<ListingCard
						currentUser={currentUser}
						key={listing.id}
						data={listing}
					/>
				))}
			</div>
		</Container>
	);
};

export default FavoriteClient;
