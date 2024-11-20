type AccountDataRowProps = {
    label: string;
    value: string;
  };
  
  const AccountDataRow: React.FC<AccountDataRowProps> = ({ label, value }) => (
    <>
      <div className="col-span-4 text-right">
        <p className="font-semibold">{label}:</p>
      </div>
      <div className="col-span-4 text-left">
        <p className="font-medium">{value}</p>
      </div>
    </>
  );
  

  export default AccountDataRow