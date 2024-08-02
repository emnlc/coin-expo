import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "@/lib/helper/supabase";
import { useUser } from "../../context/UserContext";

interface Props {
  coin: Coins;
  img: string;
}

interface Coins {
  id: number;
  name: string;
  cmc_rank: number;
  symbol: string;
  slug: string;
  max_supply: number;
  total_supply: number;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      volume_24h: number;
      fully_diluted_market_cap: number;
      market_cap_dominance: number;
    };
  };
}

const CoinHeader = (props: Props) => {
  const { user } = useUser()
  const [favorited, setFavorited] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("watchlist")
          .select("coin")
          .eq("email", user.email)
          .single(); // only one record is fetched

        if (error) {
          console.error("Error fetching watchlist:", error.message);
        } else if (data) {
          // console.log("Checking if favorited...");
          setFavorited(data.coin.includes(props.coin.slug));
        }
      }
    };

    fetchWatchlist();
  }, [user, props.coin.slug]);

  const watchlistUpdate = async () => {
    // check if row exists
    const { data } = await supabase
      .from("watchlist")
      .select("*")
      .eq("email", user?.email)
      .single(); // only one record is fetched

    if (data) {
      // if row exists
      let newCoin;
      if (favorited) {
        // delete if currently favorited
        const set = new Set([...data.coin]); // convert array to set
        set.delete(props.coin.slug); // delete coin from set
        newCoin = Array.from(set); // convert set to array
        setFavorited(false);
      } else {
        // add to watchlist
        newCoin = [...data.coin, props.coin.slug];
        setFavorited(true);
      }

      const { error: updateError } = await supabase
        .from("watchlist")
        .update({ coin: newCoin })
        .eq("email", user?.email);

      if (updateError) {
        console.error(updateError);
        return;
      }
    } else {
      // insert new row
      const { error: insertError } = await supabase
        .from("watchlist")
        .insert([{ email: user?.email, coin: [props.coin.slug] }]);

      if (insertError) {
        console.error(insertError);
        return;
      }
    }
  };

  const percentChangeColor = (change: number) => {
    let color = "green";
    let tick = "up";
    let negative = false;
    if (change.toLocaleString()[0] === "-") {
      color = "red";
      tick = "down";
      negative = true;
    }

    return (
      <>
        <img
          src={`/${tick}.svg`}
          className={`w-4 h-4 ${negative ? "rotate-180 md:rotate-0" : ""}`}
          alt=""
        />
        <span className={`text-${color}-500 font-semibold text-sm`}>
          {negative
            ? change.toFixed(2).toString().slice(1)
            : change.toFixed(2).toString()}
          % (1h)
        </span>
      </>
    );
  };

  return (
    <div className="flex flex-row items-center gap-4 mb-8">
      <img className="h-16 w-16 rounded-full" src={props.img} alt="" />
      <div className="font-semibold text-2xl flex flex-col">
        <div className="flex items-center">
          {props.coin.name}{" "}
          {percentChangeColor(props.coin.quote.USD.percent_change_1h)}
          {user ? (
            <button className="ml-4 text-base" onClick={watchlistUpdate}>
              <FontAwesomeIcon
                icon={favorited ? faStarSolid : faStar}
                className="text-yellow-500"
              />
            </button>
          ) : (
            <></>
          )}
        </div>{" "}
        <span className=" text-sm text-gray-500 dark:text-gray-400">
          {props.coin.symbol}
        </span>
      </div>
    </div>
  );
};

export default CoinHeader;
