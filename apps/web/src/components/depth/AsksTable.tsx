interface AsksTableProps {
  asks: { price: number; quantity: number }[];
  outcome: "YES" | "NO";
}

export const AskTable = ({ asks, outcome }: AsksTableProps) => {
  console.log("asks", asks);
  let currentTotal = 0;
  const relevantAsks = asks.slice(0, 5);
  console.log("relevant asks", relevantAsks);
  relevantAsks.reverse();

  let asksWithTotal: [number, number, number][] = [];
  for (let i = relevantAsks.length - 1; i >= 0; i--) {
    const ask = relevantAsks[i];
    if (ask) {
      // Add null check
      const { price, quantity } = ask;
      asksWithTotal.push([price, quantity, (currentTotal += Number(quantity))]);
    }
  }
  const maxTotal = relevantAsks.reduce(
    (acc, ask) => acc + Number(ask.quantity),
    0
  );

  return (
    <div>
      {asksWithTotal.map(([price, quantity, total]) => (
        <Ask
          maxTotal={maxTotal}
          key={price}
          price={price.toString()}
          quantity={quantity.toString()}
          total={total}
          outcome={outcome}
        />
      ))}
    </div>
  );
};
function Ask({
  price,
  quantity,
  total,
  maxTotal,
  outcome,
}: {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
  outcome: "YES" | "NO";
}) {
  console.log("price", price);
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${(100 * total) / maxTotal}%`,
          height: "100%",
          background:
            outcome === "YES"
              ? "rgba(173, 216, 230, 0.4)"
              : "rgba(228, 75, 68, 0.325)",
          transition: "width 0.3s ease-in-out",
        }}
      ></div>
      <div className="flex justify-between text-sm w-full text-black mb-2 border-gray-300  border-t-1">
        <div className="items-center justify-center flex">{price}</div>
        <div>{quantity}</div>
      </div>
    </div>
  );
}
