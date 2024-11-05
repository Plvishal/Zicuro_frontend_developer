function Button({ ...props }) {
  return (
    <>
      <button {...props} style={styles.button}>
        Save
      </button>
    </>
  );
}

export default Button;

const styles = {
  button: {
    padding: '5px 18px',
    backgroundColor: 'blue',
    color: 'white',
    fontFamily: 'serif',
    fontSize: 'medium',
    border: '1px solid white',
    borderRadius: '6px',
  },
};
