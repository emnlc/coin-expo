import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  coin: Coin;
}

interface Coin {
  name: string;
  id: string;
  symbol: string;
  description: string;
  logo: string;
  twitter_username: string;
  urls: {
    website: [string];
    twitter: [string];
    message_board: [string];
    facebook: [string];
    explorer: [];
    reddit: [string];
    technical_doc: [string];
    source_code: [string];
  };
}

const CoinUrls = (props: Props) => {
  const getWebsiteName = (url: string) => {
    if (!url) {
      return;
    }
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    let name = "";

    if (parts.length > 2) {
      name = parts[1];
    } else {
      name = parts[0];
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="flex flex-col md:w-2/3 gap-4">
      <h1 className="text-2xl font-semibold">{props.coin.name} URLs</h1>
      <div className="flex flex-col gap-2 text-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Explorer Links</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                {props.coin.urls.explorer.map((url, index) => (
                  <li className="" key={index}>
                    <a
                      href={url}
                      className="hover:text-blue-500 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getWebsiteName(url)}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Source Code and Documentation</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                {props.coin.urls.source_code.map((url, index) => (
                  <li className="" key={index}>
                    <a
                      href={url}
                      className="hover:text-blue-500 transition-all"
                      target="_blank"
                    >
                      {getWebsiteName(url)}
                    </a>
                  </li>
                ))}

                {props.coin.urls.technical_doc.map((url, index) => (
                  <li className="" key={index}>
                    <a
                      href={url}
                      className="hover:text-blue-500 transition-all"
                      target="_blank"
                    >
                      {getWebsiteName(url)}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Socials</AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-2">
                <li>
                  <a
                    target="_blank"
                    href={props.coin.urls.twitter.toString()}
                    className="hover:text-blue-500 transition-all"
                  >
                    {getWebsiteName(props.coin.urls.twitter.toString())}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={props.coin.urls.reddit.toString()}
                    className="hover:text-blue-500 transition-all"
                  >
                    {getWebsiteName(props.coin.urls.reddit.toString())}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={props.coin.urls.message_board.toString()}
                    className="hover:text-blue-500 transition-all"
                  >
                    {getWebsiteName(props.coin.urls.message_board.toString())}
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href={props.coin.urls.facebook.toString()}
                    className="hover:text-blue-500 transition-all"
                  >
                    {getWebsiteName(props.coin.urls.facebook.toString())}
                  </a>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default CoinUrls;
