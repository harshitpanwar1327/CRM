import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecordById } from '../api/fetchapi'; // Adjust the path as necessary
import './CustomerDetails.css'; // Import the CSS file for styling

const CustomerDetails = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [customer, setCustomer] = useState(null);
  const [sameEmailRecords, setSameEmailRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFields, setExpandedFields] = useState({}); // Track which fields are expanded

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      // Validate the ID format (e.g., ObjectId length)
      if (!id || id.length !== 24) {
        setError('Invalid customer ID');
        setLoading(false);
        return; // Stop execution if ID is invalid
      }

      try {
        const data = await fetchRecordById(id); // Call the API function
        console.log('Fetched data:', data); // Log the fetched data

        if (!data || !data.record) {
          setError('No customer found with this ID');
        } else {
          setCustomer(data.record);
          setSameEmailRecords(data.sameEmailRecords);
        }
      } catch (err) {
        console.error('Fetch error:', err); // Log the error for debugging
        setError('Error fetching customer details');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]); // Dependency array includes id to refetch when it changes

  if (loading) return <p className='loading'>Loading...</p>;
  if (error) return <p className='error'>{error}</p>;

  const totalAmount =
    sameEmailRecords
      .filter((record) =>
          record._id !== customer?._id && record.Status !== 'Declined' // Exclude same customer and declined records
      )
      .reduce((sum, record) => sum + (record.Amount || 0), 0) +
    (customer?.Status !== 'Declined' ? customer.Amount || 0 : 0); // Include customer.Amount only if not declined

  const fieldsToDisplay = {
    'Full Name': customer.Full_Name,
    Magazine: customer.Magazine,
    Currency: customer.Currency,
    Status: customer.Status,
    'Payment Type': customer.Payment_Type,
    'Payment Method': customer.Payment_Method,
    Email: customer.Email,
    Address: customer.Address,
    'ZIP Code': customer.Zip_Code,
    'Order ID': customer.Order_id,
    Product: customer.Product,
    // Amount: customer.Amount,
    Shipping: customer.Shipping,
    Discount: customer.Discount,
    'Total Amount': totalAmount.toFixed(2),
    // Quantity: customer.Quantity,
    // Instagram: customer.Model_Insta_Link,
  };

  // Filter out the main customer record from the sameEmailRecords
  const filteredSameEmailRecords = sameEmailRecords.filter(
    (record) => record._id !== customer._id
  );

  // Toggle the expansion of fields
  const toggleFieldExpansion = (field) => {
    setExpandedFields((prev) => ({
      ...prev,
      [field]: !prev[field], // Toggle the current field
    }));
  };

  return (
    <div className='customer-details'>
      <h2>Customer Details</h2>
      <div className='details-container'>
        {Object.entries(fieldsToDisplay).map(([key, value]) => (
          <div
            className={`detail-item ${key === 'Status'
              ? value === 'Successful'
                ? 'record-item-successful' : 'record-item-decline'
              : 'transparent'}`}
            key={key}
            onClick={() => toggleFieldExpansion(key)}
            role='button'
            tabIndex={0}
            onKeyPress={(e) =>
              (e.key === 'Enter' || e.key === ' ') && toggleFieldExpansion(key)
            }
            aria-expanded={expandedFields[key] ? 'true' : 'false'}
          >
            <strong>{key}:</strong>{' '}
            {value !== undefined && value !== null ? value.toString() : 'N/A'}
            {/* Show additional details if the field is expanded */}
            {(key === 'Amount' ||
              key === 'Quantity' ||
              key === 'Magazine' ||
              key === 'Product') &&
              expandedFields[key] && (
                <div className='additional-info'>
                  <p>
                    <strong>Additional Information for {key}:</strong>
                  </p>
                  <p>{/* Add additional details here if needed */}</p>
                </div>
              )}
          </div>
        ))}
      </div>

      <h3>Other Records with the Same Email:</h3>
      <div className='same-email-records'>
        {filteredSameEmailRecords.length > 0 ? (
          filteredSameEmailRecords.map((record) => (
            <div 
              className={`record-item ${
                record.Status === 'Successful' ? 'record-item-successful' : 'record-item-decline'
              }`}
              key={record._id}
            >
              <strong>Order ID:</strong> {record.Order_id} <br />
              <strong>Magazine:</strong> {record.Magazine} <br />
              <strong>Product:</strong> {record.Product} <br />
              {/* <strong>Amount:</strong> {record.Amount} <br /> */}
              <strong>Status:</strong> {record.Status} <br />
              <hr />
            </div>
          ))
        ) : (
          <p>No other records found with the same email.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
