import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const SHIPPING_FAQ = [
  "How will my parcel be delivered?",
  "Do I pay for delivery?",
  "Will I be charged customs fees?",
  "My item has become faulty",
];

const ORDER_FAQ = [
  "Tracking my order",
  "I haven’t received my order",
  "How can I return an item?",
  "Do i get email after order",
];

const PAYMENT_FAQ = [
  "What payment types can I use?",
  "Can I pay by Gift Card?",
  "I can't make a payment",
  "Has my payment gone through?",
];

const Faq = () => {
  return (
    <div>
      <div className="flex items-center justify-center text-4xl h-[170px] bg-gradient-to-r from-gray-200 to-gray-300">
        F.A.Q
      </div>

      <div className="mt-20 mb-10 space-y-12">
        <div className="space-y-8">
          <h1 className="text-center text-3xl font-medium">
            Shipping Information
          </h1>
          <div>
            <AccordionCustomStyles list={SHIPPING_FAQ} />
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="text-center text-3xl font-medium">
            Orders and Returns
          </h1>
          <div>
            <AccordionCustomStyles list={ORDER_FAQ} />
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="text-center text-3xl font-medium">Payments</h1>
          <div>
            <AccordionCustomStyles list={PAYMENT_FAQ} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

export function AccordionCustomStyles({ list = [] }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {list.map((item, index) => (
        <Accordion
          key={item}
          open={open === index}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
        >
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className={`border-b-0 transition-colors ${
              open === index ? "text-amber-500 hover:!text-amber-700" : ""
            }`}
          >
            {item}
          </AccordionHeader>
          <AccordionBody className="pt-0 text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla qui
            nulla laboris incididunt aliqua incididunt laborum magna mollit ut
            mollit fugiat. Commodo ullamco labore laboris Lorem pariatur aliqua
            ullamco consectetur Lorem voluptate dolore. Ullamco qui aliqua in do
            ea eiusmod adipisicing. Magna adipisicing incididunt elit officia
            nulla ullamco qui Lorem eu magna qui laboris dolor laboris. Culpa
            deserunt magna ad aliqua dolore dolore dolor sunt laborum sint ut
            magna magna. Officia tempor eiusmod commodo fugiat consectetur
            adipisicing sunt sunt. Voluptate officia et anim minim commodo
            pariatur laboris excepteur culpa. Magna eiusmod proident enim aute
            dolor incididunt qui enim consectetur commodo laborum cillum. Sint
          </AccordionBody>
        </Accordion>
      ))}
    </>
  );
}
