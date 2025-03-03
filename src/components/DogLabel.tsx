interface DogLabelProps {
  breed: string;
  age: number;
  zip: string;
}

const DogLabel = ({ breed, age, zip }: DogLabelProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        gap: "4px",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "lightblue",
          padding: "5px",
          borderRadius: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#666",
            whiteSpace: "normal",
            overflow: "visible",
            textOverflow: "unset",
            wordBreak: "break-word",
            maxWidth: "100%",
          }}
        >
          {breed}
        </p>
      </div>
      <div
        style={{
          background: "lightblue",
          padding: "5px",
          borderRadius: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#666",
          }}
        >
          {age} years
        </p>
      </div>
      <div
        style={{
          background: "lightblue",
          padding: "5px",
          borderRadius: 10,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "12px",
            color: "#666",
          }}
        >
          {zip} area code
        </p>
      </div>
    </div>
  );
};

export default DogLabel;
