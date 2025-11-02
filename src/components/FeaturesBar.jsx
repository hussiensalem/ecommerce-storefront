import { Truck, Banknote, LockKeyhole, Phone} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Free Shipping",
      sub: "Order above $200",
    },
    {
      icon: <Banknote className="w-10 h-10" />,
      title: "Money-back",
      sub: "30 days guarantee",
    },
    {
      icon: <LockKeyhole className="w-10 h-10" />,
      title: "Secure Payments",
      sub: "Secured by Stripe",
    },
    {
      icon: <Phone className="w-10 h-10 " />,
      title: "24/7 Support",
      sub: "Phone & Email support",
    },
  ];

  return (
    <section className=" w-full  py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((f, i) => ( 
          <div key={i} className=" flex flex-col items-start gap-3 border p-8 md:p-14 bg-[#f3f5f7]">
            {f.icon}
            <div>
              <p className=" text-md md:text-lg font-semibold">{f.title}</p>
              <p className="text-sm text-gray-500">{f.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
