const toRupiah = (total)=>{
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  }).format(total);
}
export default toRupiah