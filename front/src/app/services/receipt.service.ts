import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor() {}

  generateReceiptPDF(receiptData: any): void {
    const receiptContent = this.generateReceiptHTML(receiptData);

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${receiptData.transactionData ? 'Invoice' : 'Receipt'} - ${
        receiptData.orderNumber
      }</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: #f8f9fa;
              }
              .receipt-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #22c55e;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #22c55e;
                margin-bottom: 10px;
              }
              .receipt-title {
                font-size: 20px;
                color: #333;
                margin: 0;
              }
              .order-info {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                flex-wrap: wrap;
              }
              .order-info div {
                margin-bottom: 10px;
              }
              .label {
                font-weight: bold;
                color: #666;
              }
              .value {
                color: #333;
                margin-left: 10px;
              }
              .eco-section {
                background: #f0fdf4;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #22c55e;
              }
              .eco-title {
                color: #15803d;
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 15px;
              }
              .eco-benefits {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
              }
              .eco-benefit {
                display: flex;
                align-items: center;
              }
              .eco-icon {
                width: 20px;
                height: 20px;
                background: #22c55e;
                border-radius: 50%;
                margin-right: 10px;
              }
              .total-section {
                border-top: 2px solid #e5e7eb;
                padding-top: 20px;
                text-align: right;
              }
              .total-amount {
                font-size: 24px;
                font-weight: bold;
                color: #22c55e;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #666;
                font-size: 14px;
              }
              .transaction-specific {
                background: #f8fffe;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border: 1px solid #22c55e;
              }
              .transaction-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                background: #f8fffe;
              }
              .transaction-table th {
                background: #22c55e;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: bold;
              }
              .transaction-table td {
                padding: 12px;
                border-bottom: 1px solid #e5e7eb;
              }
              @media print {
                body { background: white; }
                .receipt-container { box-shadow: none; }
              }
            </style>
          </head>
          <body>
            ${receiptContent}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for content to load then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      };
    }
  }

  private generateReceiptHTML(data: any): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const transactionDate = data.date
      ? new Date(data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : currentDate;

    const isTransaction = data.transactionData;
    const title = isTransaction ? 'INVOICE' : 'PAYMENT RECEIPT';

    return `
      <div class="receipt-container">
        <div class="header">
          <div class="logo">🌱 EcoProject</div>
          <h1 class="receipt-title">${title}</h1>
        </div>
        
        <div class="order-info">
          <div>
            <span class="label">${
              isTransaction ? 'Invoice' : 'Order'
            } Number:</span>
            <span class="value">${data.orderNumber}</span>
          </div>
          <div>
            <span class="label">${
              isTransaction ? 'Transaction' : 'Payment'
            } Date:</span>
            <span class="value">${transactionDate}</span>
          </div>
          <div>
            <span class="label">Generated Date:</span>
            <span class="value">${currentDate}</span>
          </div>
          <div>
            <span class="label">Status:</span>
            <span class="value">Confirmed</span>
          </div>
          ${
            isTransaction
              ? `
          <div>
            <span class="label">Project Country:</span>
            <span class="value">${data.transactionData.country}</span>
          </div>
          `
              : ''
          }
        </div>

        ${
          isTransaction
            ? `
        <table class="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Country</th>
              <th>Environmental Impact</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${data.transactionData.description}</td>
              <td>${data.transactionData.country}</td>
              <td>${data.transactionData.environmentalImpact}</td>
              <td>${data.totalCost}</td>
            </tr>
          </tbody>
        </table>
        `
            : ''
        }

        <div class="eco-section">
          <h3 class="eco-title">Environmental Impact Report</h3>
          <div class="eco-benefits">
            ${data.ecoBenefits
              .map(
                (benefit: any) => `
              <div class="eco-benefit">
                <div class="eco-icon"></div>
                <div>
                  <div class="label">${benefit.label}</div>
                  <div class="value">${benefit.value}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="total-section">
          <div>
            <span class="label">Total Amount:</span>
            <span class="total-amount">${data.totalCost}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your contribution to environmental sustainability!</p>
          <p>This ${
            isTransaction ? 'invoice' : 'receipt'
          } was generated on ${currentDate}</p>
          <p>For questions, contact us at support@ecoproject.com</p>
        </div>
      </div>
    `;
  }

  downloadReceiptAsFile(receiptData: any): void {
    const receiptContent = this.generateReceiptHTML(receiptData);
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Receipt - ${receiptData.orderNumber}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 20px;
              background: #f8f9fa;
            }
            /* Add same styles as above */
          </style>
        </head>
        <body>
          ${receiptContent}
        </body>
      </html>
    `;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receiptData.orderNumber}.html`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
