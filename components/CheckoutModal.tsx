import React, { useState, useEffect } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FormInput: React.FC<{ label: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, ...props }) => (
    <div className="text-left">
        <label className="block mb-1.5 text-sm font-semibold text-gray-300">{label}</label>
        <input 
            type="text" 
            {...props}
            className="w-full p-2.5 bg-gray-700/50 border border-gray-600 text-white rounded-md focus:ring-red-500 focus:border-red-500 transition"
        />
    </div>
);

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(card.trim() !== '' && expiry.trim() !== '' && cvv.trim() !== '' && address.trim() !== '');
  }, [card, expiry, cvv, address]);
  
  const handleConfirm = () => {
      if (isValid) {
          onConfirm();
          // Clear form
          setCard('');
          setExpiry('');
          setCvv('');
          setAddress('');
      }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className={`bg-gray-800/80 backdrop-blur-lg border border-gray-700/50 p-8 rounded-lg w-full max-w-lg text-center shadow-2xl transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>Complete Your Purchase</h2>
        <p className="mb-6 text-gray-400">Enter payment information to complete your purchase.</p>

        <div className="space-y-4 mb-6">
            <FormInput label="Card Number" placeholder="1234 5678 9012 3456" value={card} onChange={e => setCard(e.target.value)} />
            <div className="flex gap-4">
                <div className="flex-1">
                    <FormInput label="Expiry Date" placeholder="MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} />
                </div>
                <div className="flex-1">
                    <FormInput label="CVV" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} />
                </div>
            </div>
            <FormInput label="Billing Address" placeholder="123 Main St" value={address} onChange={e => setAddress(e.target.value)} />
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105">
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={!isValid} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};
