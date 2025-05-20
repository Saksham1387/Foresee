export const AskTable = ({ asks }: { asks: { price: number; quantity: number }[] }) => {
    console.log("asks", asks);
    let currentTotal = 0;
    const relevantAsks = asks.slice(0, 15);
    console.log("relevant asks", relevantAsks);
    relevantAsks.reverse();
    
    let asksWithTotal: [number, number, number][] = [];
    for(let i = relevantAsks.length - 1; i >= 0; i--) {
        const ask = relevantAsks[i];
        if (ask) { // Add null check
            const { price, quantity } = ask;
            asksWithTotal.push([price, quantity, currentTotal += Number(quantity)]);
        }
    }
    const maxTotal = relevantAsks.reduce((acc, ask) => acc + Number(ask.quantity), 0);
    asksWithTotal.reverse();

    return <div>
        {asksWithTotal.map(([price, quantity, total]) => <Ask maxTotal={maxTotal} key={price} price={price.toString()} quantity={quantity.toString()} total={total} />)}
    </div>
}
function Ask({price, quantity, total, maxTotal}: {price: string, quantity: string, total: number, maxTotal: number}) {
    return <div
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
        background: "rgba(228, 75, 68, 0.325)",
        transition: "width 0.3s ease-in-out",
        }}
    ></div>
    <div className="flex justify-between text-xs w-full">
        <div>
            {price}
        </div>
        <div>
            {quantity}
        </div>
        <div>
            {total?.toFixed(2)}
        </div>
    </div>
    </div>
}
