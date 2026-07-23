import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [connected, setConnected] = useState(false);
  const [contractId, setContractId] = useState('');
  const [showIdInput, setShowIdInput] = useState(true);

  const handleSetContractId = (id: string) => {
    if (id.length === 56 && id.startsWith('C')) {
      setContractId(id);
      setConnected(true);
      setShowIdInput(false);
      setError('');
    } else {
      setError('Invalid contract ID. Must start with C and be 56 characters.');
    }
  };

  const callIncrement = async () => {
    if (!contractId) {
      setError('Please set a contract ID first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // This is a demonstration of how to call the contract
      // In a real application, you would need to:
      // 1. Have a connected wallet (FreighterWallet or similar)
      // 2. Sign the transaction
      // 3. Submit it to the network
            // For demonstration, just increment the local count
            setCount(count + 1);

            // In production, you would submit a real transaction here
            console.log('Contract call simulated. Contract ID:', contractId);
            console.log('New count:', count + 1);
        } catch (err: any) {
            setError(err.message || 'Failed to call contract');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="counter-container">
            <style>{`
        .counter-container {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          margin: 2rem 0;
        }

        .contract-id-section {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .input-group input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 0.9rem;
          font-family: 'Courier New', monospace;
        }

        .input-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .input-group button {
          padding: 0.75rem 1.5rem;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .input-group button:hover {
          background: #5568d3;
        }

        .status {
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .status.connected {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .counter-display {
          text-align: center;
          margin: 2rem 0;
        }

        .counter-number {
          font-size: 3.5rem;
          font-weight: bold;
          color: #667eea;
          margin: 1rem 0;
        }

        .counter-label {
          font-size: 1rem;
          color: #666;
          margin-bottom: 1.5rem;
        }

        button.increment-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.1s, box-shadow 0.2s;
        }

        button.increment-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }

        button.increment-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        button.increment-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .info-box {
          background: #f0f4ff;
          border-left: 4px solid #667eea;
          padding: 1rem;
          border-radius: 4px;
          margin-top: 1.5rem;
          font-size: 0.9rem;
          color: #333;
          line-height: 1.6;
        }

        .code-snippet {
          background: #f5f5f5;
          padding: 0.75rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          overflow-x: auto;
          margin-top: 0.5rem;
        }
      `}</style>

            {showIdInput ? (
                <div className="contract-id-section">
                    <h2>Connect to Increment Contract</h2>
                    <p>Enter your deployed contract ID to get started:</p>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Contract ID (e.g., CDUDUYIEFPXFEA3WBKLC6MOOYCTBZXDGSAILDDVEZ2ZG2W2JWHL2R3JG)"
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val.length === 56 && val.startsWith('C')) {
                                    handleSetContractId(val);
                                }
                            }}
                        />
                        <button onClick={() => setShowIdInput(false)}>Skip for Demo</button>
                    </div>
                    {error && <div className="status error">{error}</div>}
                    <div className="info-box">
                        <strong>To deploy your increment contract:</strong>
                        <div className="code-snippet">
                            cd contracts/increment && stellar contract deploy --network testnet
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {connected && (
                        <div className="status connected">✓ Connected to contract {contractId.slice(0, 8)}...</div>
                    )}

                    <div className="counter-display">
                        <div className="counter-label">Current Count</div>
                        <div className="counter-number">{count}</div>
                    </div>

                    <button
                        className="increment-btn"
                        onClick={callIncrement}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : '+ Increment'}
                    </button>

                    {error && <div className="status error">{error}</div>}

                    <div className="info-box">
                        <strong>About this demo:</strong>
                        <p>
                            This frontend is currently in demo mode. To make real contract calls:
                        </p>
                        <ol>
                            <li>Deploy your increment contract to testnet</li>
                            <li>Enter the contract ID above</li>
                            <li>Install a Soroban-compatible wallet (e.g., Freighter)</li>
                            <li>The increment button will then submit real transactions</li>
                        </ol>
                    </div>
                </>
            )}
        </div>
    );
}