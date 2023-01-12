export default function Alert(props: any) {
  return (
    <>
      <div
        className={`m-0 position-fixed topAlert w-auto alert alert-${props.type}`}
        role="alert"
      >
        {props.message}
      </div>
    </>
  );
}
