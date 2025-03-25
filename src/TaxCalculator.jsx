import React, { useState } from 'react';

const TaxCalculator = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [financialYear, setFinancialYear] = useState('FY 2023-24');
  const [ageGroup, setAgeGroup] = useState('below60');

  // Income state
  const [incomeData, setIncomeData] = useState({
    salaryIncome: '',
    interestIncome: '',
    rentalIncome: '',
    digitalAssetsIncome: '',
    exemptAllowances: '',
    homeLoanInterestSelf: '',
    homeLoanInterestLetOut: '',
    otherIncome: '',
  });

  // Deduction state  
  const [deductionData, setDeductionData] = useState({
    basicDeductions: '',
    depositInterest: '',
    medicalInsurance: '',
    charityDonations: '',
    housingLoanInterest: '',
    npsEmployeeContribution: '',
    npsEmployerContribution: '',
    otherDeductions: '',
  });

  const [taxResult, setTaxResult] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncomeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeductionChange = (e) => {
    const { name, value } = e.target;
    setDeductionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderBasicDetails = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Details</h2>
      
      <div className="space-y-2">
        <label className="block text-gray-700">Financial Year</label>
        <select 
          value={financialYear}
          onChange={(e) => setFinancialYear(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="FY 2023-24">FY 2023-24</option>
          <option value="FY 2024-25">FY 2024-25</option>
          <option value="FY 2025-26">FY 2025-26</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700">Age Group</label>
        <select
          value={ageGroup}
          onChange={(e) => setAgeGroup(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="below60">Below 60 years (Regular Citizen)</option>
          <option value="between60and80">Between 60-79 years (Senior Citizen)</option>
          <option value="above80">80 and above (Super Senior Citizen)</option>
        </select>
      </div>

      <button
        onClick={() => setActiveSection('income')}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );

  const renderIncomeDetails = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Income Details</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.entries({
            salaryIncome: ["Income from Salary", "Salary before reducing HRA, LTA, standard deductions & professional tax. If applicable, reduce leave encashment (max: 25L)"],
            interestIncome: ["Income from interest", "Includes interest from savings bank, deposits and other interest"],
            rentalIncome: ["Rental income received", "Annual rent received on let-out property (Standard deduction @30% will be auto calculated)"],
            digitalAssetsIncome: ["Income from digital assets", "Net Income from Digital Assets, taxed at 30%"]
          }).map(([key, [label, tooltip]]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center gap-2">
                <label className="text-gray-700">{label}</label>
                <div className="relative group">
                  <span className="cursor-help rounded-full bg-gray-200 px-2 py-0.5">i</span>
                  <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded w-64 text-sm z-10">
                    {tooltip}
                  </div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name={key}
                  value={incomeData[key]}
                  onChange={handleIncomeChange}
                  className="w-full p-2 border rounded"
                />
                <div className="absolute right-3 top-2">₹</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Object.entries({
            exemptAllowances: ["Exempt allowances", "HRA, LTA, Professional Tax and any Other Exemptions"],
            homeLoanInterestSelf: ["Interest on home loan - Self occupied", "Interest paid on housing loan taken for self-occupied property"],
            homeLoanInterestLetOut: ["Interest on Home Loan - Let Out", "Interest paid on housing loan taken for rented/let-out property"],
            otherIncome: ["Other income", "Includes taxable freelancing income or any other taxable income"]
          }).map(([key, [label, tooltip]]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center gap-2">
                <label className="text-gray-700">{label}</label>
                <div className="relative group">
                  <span className="cursor-help rounded-full bg-gray-200 px-2 py-0.5">i</span>
                  <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded w-64 text-sm z-10">
                    {tooltip}
                  </div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name={key}
                  value={incomeData[key]}
                  onChange={handleIncomeChange}
                  className="w-full p-2 border rounded"
                />
                <div className="absolute right-3 top-2">₹</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveSection('basic')}
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => setActiveSection('deductions')}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderDeductions = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Deductions</h2>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          {Object.entries({
            basicDeductions: ["Basic deductions - 80C", "Amount invested/paid in tax saving instruments such as PPF, ELSS mutual funds, LIC premium, etc. (max: 1.5L)"],
            depositInterest: ["Interest from deposits - 80TTA", "Amount of interest income on deposits in savings account (includes fixed/recurring deposit interest in case of senior citizen)"],
            medicalInsurance: ["Medical insurance - 80D", "Medical premium & preventive health checkup fees paid for self & family including parents"],
            charityDonations: ["Donations to charity - 80G", "Amount paid as donation to charitable insitutions or certain recognized funds"]
          }).map(([key, [label, tooltip]]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center gap-2">
                <label className="text-gray-700">{label}</label>
                <div className="relative group">
                  <span className="cursor-help rounded-full bg-gray-200 px-2 py-0.5">i</span>
                  <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded w-64 text-sm z-10">
                    {tooltip}
                  </div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name={key}
                  value={deductionData[key]}
                  onChange={handleDeductionChange}
                  className="w-full p-2 border rounded"
                />
                <div className="absolute right-3 top-2">₹</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Object.entries({
            housingLoanInterest: ["Interest on housing loan - 80EEA", "Amount of interest paid on housing loan sanctioned during FY 2022-2023 (max: 1.5L)"],
            npsEmployeeContribution: ["Employee's contribution to NPS - 80CCD", "Includes voluntary contribution to National Pension Scheme (NPS) under section 80CCD(1) and 80CCD(1B)"],
            npsEmployerContribution: ["Employer's contribution to NPS - 80CCD(2)", "Amount of contributions made by employer to the National Pension Scheme (NPS) under Section 80CCD(2)"],
            otherDeductions: ["Any other deduction", "Enter the deduction amount to be claimed under any other sections not listed above"]
          }).map(([key, [label, tooltip]]) => (
            <div key={key} className="space-y-1">
              <div className="flex items-center gap-2">
                <label className="text-gray-700">{label}</label>
                <div className="relative group">
                  <span className="cursor-help rounded-full bg-gray-200 px-2 py-0.5">i</span>
                  <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded w-64 text-sm z-10">
                    {tooltip}
                  </div>
                </div>
              </div>
              <div className="relative">
                <input
                  type="number"
                  name={key}
                  value={deductionData[key]}
                  onChange={handleDeductionChange}
                  className="w-full p-2 border rounded"
                />
                <div className="absolute right-3 top-2">₹</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setActiveSection('income')}
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={() => {
            setTaxResult(true);
            setShowComparison(true);
          }}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Calculate
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Income Tax Calculator</h1>
        
        <div className="flex gap-4 mb-6">
          {['basic', 'income', 'deductions'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 ${activeSection === section ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)} Details
            </button>
          ))}
        </div>

        {activeSection === 'basic' && renderBasicDetails()}
        {activeSection === 'income' && renderIncomeDetails()}
        {activeSection === 'deductions' && renderDeductions()}
        
        {taxResult && showComparison && (
          <div className="mt-6 p-4 bg-gray-100">
            <h3 className="text-xl mb-4">Tax Comparison</h3>
            {/* Bar chart would go here */}
            <div className="h-64 bg-white p-4 rounded">
              Bar Chart Placeholder
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;