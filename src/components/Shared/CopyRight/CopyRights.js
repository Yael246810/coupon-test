import "../../Layout/Footer//Footer.css";

function CopyRights() {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p>&copy; {year} all rights reserved to Yael</p>
    </div>
  );
}

export default CopyRights;
