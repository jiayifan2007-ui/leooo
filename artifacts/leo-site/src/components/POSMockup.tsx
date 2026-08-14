export default function POSMockup() {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[520px]">
      {/* outer glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-10 blur-3xl"
        style={{ background: '#F59E0B' }}
      />

      {/* POS terminal */}
      <div
        className="relative w-80 rounded-2xl overflow-hidden shadow-2xl border"
        style={{ background: '#1C1917', borderColor: '#44403C' }}
      >
        {/* Status bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b"
          style={{ borderColor: '#44403C' }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#A8A29E' }}
          >
            Leo POS
          </span>
          <span className="text-xs font-medium" style={{ color: '#F59E0B' }}>
            Table 4
          </span>
        </div>

        {/* Order list */}
        <div className="px-5 pt-4 pb-2 space-y-2">
          {[
            { name: 'Grilled Salmon', qty: 2, price: '€38.00' },
            { name: 'Caesar Salad', qty: 1, price: '€12.50' },
            { name: 'Sparkling Water', qty: 3, price: '€9.00' },
            { name: 'Tiramisu', qty: 2, price: '€16.00' },
            { name: 'House Red Wine', qty: 1, price: '€22.00' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between py-1.5 border-b"
              style={{ borderColor: '#292524' }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold"
                  style={{ backgroundColor: '#292524', color: '#F59E0B' }}
                >
                  {item.qty}
                </span>
                <span className="text-sm" style={{ color: '#F5F5F4' }}>
                  {item.name}
                </span>
              </div>
              <span className="text-sm" style={{ color: '#A8A29E' }}>
                {item.price}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mx-5 my-3 border-t border-dashed"
          style={{ borderColor: '#44403C' }}
        />

        {/* Total */}
        <div className="px-5 pb-4 flex items-center justify-between">
          <span className="text-base font-semibold" style={{ color: '#F5F5F4' }}>
            Total
          </span>
          <span className="text-2xl font-bold" style={{ color: '#FCD34D' }}>
            €142.50
          </span>
        </div>

        {/* Action buttons */}
        <div className="px-5 pb-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="py-2.5 rounded-lg text-sm font-semibold border"
            style={{
              backgroundColor: '#292524',
              color: '#A8A29E',
              borderColor: '#44403C',
            }}
            data-testid="button-split-bill"
          >
            Split Bill
          </button>
          <button
            type="button"
            className="py-2.5 rounded-lg text-sm font-bold"
            style={{ backgroundColor: '#F59E0B', color: '#0C0A09' }}
            data-testid="button-charge"
          >
            Charge
          </button>
        </div>

        {/* Payment methods */}
        <div className="px-5 pb-5 flex items-center gap-2">
          {['Card', 'Cash', 'Mobile'].map((method) => (
            <span
              key={method}
              className="flex-1 text-center text-xs py-1.5 rounded-md border"
              style={{
                backgroundColor: '#292524',
                color: '#78716C',
                borderColor: '#44403C',
              }}
            >
              {method}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
