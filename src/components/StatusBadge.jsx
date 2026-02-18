function StatusBadge({ status }) {
  const getColor = () => {
    if (status === "NEW") return "secondary";
    if (status === "FOLLOW_UP") return "warning";
    if (status === "ADMITTED") return "success";
    return "dark";
  };

  return (
    <span className={`badge bg-${getColor()}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
