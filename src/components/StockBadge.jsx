export default function StockBadge({ stock }) {
  if (stock === 0) return <p className="badge badge-out">Sold out</p>;
  if (stock <= 3) return <p className="badge badge-low">Only {stock} left</p>;
  return <p className="badge badge-ok">In stock ({stock})</p>;
}
