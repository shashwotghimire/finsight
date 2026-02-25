const AccountsCard = () => {
  return (
    <div className="ml-10 max-w-lg cursor-pointer rounded-lg bg-neutral-100 p-4 shadow-sm transition hover:bg-neutral-200 hover:shadow-lg">
      <h3>Account name</h3>
      <p>Balance</p>
      <p>Type</p>
      <p>Bank Name</p>
      <p>Currency</p>
      <p>Owned By</p>
      <p>Created At</p>
    </div>
  );
};

export default AccountsCard;
