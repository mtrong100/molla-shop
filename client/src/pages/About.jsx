import {
  CircleDollarSign,
  CreditCard,
  Mail,
  Phone,
  ShoppingBag,
  Store,
} from "lucide-react";
import TitleSection from "../components/TitleSection";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { SAMPLE_IMAGES } from "../utils/project-images";

const stastisticCard = [
  {
    icon: <Store size={30} />,
    amount: "10.5k",
    caption: "Sallers active our site",
  },
  {
    icon: <CircleDollarSign size={30} />,
    amount: "33k",
    caption: "Mopnthly Produduct Sale",
  },
  {
    icon: <ShoppingBag size={30} />,
    amount: "45.5k",
    caption: "Customer active in our site",
  },
  {
    icon: <CreditCard size={30} />,
    amount: "25k",
    caption: "Anual gross sale in our site",
  },
];

const About = () => {
  return (
    <section className="my-10">
      {/* BANNER */}
      <div className="grid grid-cols-2 gap-[75px] items-center">
        <div>
          <h1 className="text-6xl font-semibold tracking-wider">Our Story</h1>
          <p className="mt-[40px]">
            Launced in 2015, Molla is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Molla has
            10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="mt-[24px]">
            Molla has more than 1 Million products to offer, growing at a very
            fast. Molla offers a diverse assotment in categories ranging from
            consumer.
          </p>
        </div>

        <div>
          <img
            src={SAMPLE_IMAGES.banner5}
            alt="twoGirls"
            className="img-cover"
          />
        </div>
      </div>

      {/* STASTISTIC */}
      <div className="mt-[60px] grid grid-cols-4 gap-[30px]">
        {stastisticCard.map((item) => (
          <div
            key={item.amount}
            className="border border-gray-300 rounded-md flex items-center hover:bg-amber-500 hover:text-white transition-all justify-center flex-col aspect-square"
          >
            <div className="flex items-center justify-center rounded-full bg-black text-white w-[55px] h-[55px]">
              {item.icon}
            </div>
            <h1 className="mt-[24px] text-4xl font-semibold">{item.amount}</h1>
            <p className="mt-[12px]">{item.caption}</p>
          </div>
        ))}
      </div>

      {/* CONTACT */}
      <div className="mt-[140px]">
        <TitleSection>Contact us</TitleSection>
        <div className="mt-[50px] grid grid-cols-[270px_minmax(0,_1fr)] gap-[60px]">
          <section>
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-amber-500 text-white">
                  <Phone size={20} />
                </span>
                <p className="font-medium">Call To Us</p>
              </div>
              <p className="mt-[32px]">We are available 24/7, 7 days a week.</p>
              <p className="mt-[16px]">Phone: +8801611112222</p>
            </div>

            <hr className="my-2 border-blue-gray-50" />

            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center rounded-full w-[40px] h-[40px]  bg-amber-500 text-white">
                  <Mail size={20} />
                </span>
                <p className="font-medium">Write To US</p>
              </div>
              <p className="mt-[32px]">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="mt-[16px]">Emails: customer@exclusive.com</p>
            </div>
          </section>

          <section className="w-full">
            <div className="grid gap-5">
              <Input
                size="lg"
                variant="outlined"
                label="Email"
                placeholder="Enter your email..."
              />
              <Input
                size="lg"
                variant="outlined"
                label="Name"
                placeholder="Enter your Name..."
              />
              <Input
                size="lg"
                variant="outlined"
                label="Phone"
                placeholder="Enter your Phone..."
              />
            </div>
            <div className="mt-[32px]">
              <Textarea size="lg" variant="outlined" label="Message" />
            </div>
            <Button
              size="lg"
              color="amber"
              className="mt-5 flex justify-end ml-auto"
            >
              Send Massage
            </Button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
