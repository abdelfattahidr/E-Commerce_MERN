const Blocked = () => {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>
        Your account has been blocked. Please contact support for assistance.
      </p>
      <button onClick={() => (window.location.href = "/")}>Go to Home</button>
      <button onClick={() => (window.location.href = "/support")}>
        Contact Support
      </button>
    </div>
  );
};

export default Blocked;
