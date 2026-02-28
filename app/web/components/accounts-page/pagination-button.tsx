const PaginationButton = ({
  pageNumber,
  onClick,
  disabled,
}: {
  pageNumber: string;
  onClick: () => void;
  disabled: boolean;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`border-0.5 cursor-pointer rounded-lg p-3 shadow-sm transition ${disabled ? "text-muted-foreground cursor-not-allowed bg-neutral-600" : "cursor-pointer bg-neutral-300 hover:bg-neutral-500"}`}
        disabled={disabled}
      >
        {pageNumber}
      </button>
    </div>
  );
};

export default PaginationButton;
