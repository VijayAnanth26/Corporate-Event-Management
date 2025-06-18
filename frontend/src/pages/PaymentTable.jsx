// import PaginationButton from "rsuite/esm/Pagination/PaginationButton";
// import Pagination from "rsuite/esm/Pagination/Pagination";
import EventSideNav from "../components/EventSideNav";
import Pagination from "../components/Pagination";

const PaymentTable = () => {
  const payments = [
    { id: 1, eventName: 'Conference 2024', date: '2024-03-15', amount: 500 },
    { id: 2, eventName: 'Product Launch Party', date: '2024-04-10', amount: 1000 },
    { id: 3, eventName: 'Seminars Showcase', date: '2024-05-20', amount: 800 },
    { id: 4, eventName: 'Team-Building Extravaganza', date: '2024-06-05', amount: 1500 },
    { id: 5, eventName: 'Corporate Training Workshops', date: '2024-07-15', amount: 1200 },
    { id: 6, eventName: 'Networking Mixer', date: '2024-08-20', amount: 2000 },
   
  ];

  return (
        <div style={{ display : 'flex' }} >
    <div>
            <EventSideNav/>
        </div>
        <div style={{ width: '100%' }}>
            <h2>Payments</h2>
            <table id="paymentTable">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Event Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.eventName}</td>
                    <td>{payment.date}</td>
                    <td>${payment.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination/>
        </div>
    </div>
  );
};

export default PaymentTable;
