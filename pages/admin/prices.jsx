import Sidebar from '../../components/admin/Sidebar';
import PriceForm from '../../components/admin/PriceForm';

export default function AdminPrices() {
  const handleAddPrice = (data) => {
    // TODO: Send data to API
    alert('Price added: ' + JSON.stringify(data));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: 20 }}>
        <PriceForm onSubmit={handleAddPrice} />
      </main>
    </div>
  );
}