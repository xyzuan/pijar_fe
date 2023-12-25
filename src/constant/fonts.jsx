import { Poppins, Krona_One } from "next/font/google";

export const kronaOne = Krona_One({ subsets: ["latin"], weight: ["400"] });
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
