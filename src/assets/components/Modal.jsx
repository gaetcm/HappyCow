const Modal = ({ setVisible }) => {
  return (
    <div className="modal-root">
      <div
        className="modal"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* button pour fermer la modal */}
        <button
          onClick={() => {
            setVisible(false);
          }}
        >
          X
        </button>
        <p>
          Pellentesque odio metus, ultrices sed elementum ac, blandit id velit.
          Maecenas sed nibh pharetra, pulvinar sapien vitae, commodo augue. Ut a
          elementum augue. Nulla tincidunt felis sit amet est facilisis
          ultricies. Vivamus ut cursus urna, ac lacinia erat. Etiam aliquet
          auctor tortor ut molestie. Morbi lobortis dolor neque. Maecenas sed
          semper justo. Duis pulvinar pulvinar pretium. Proin rhoncus nec risus
          sed accumsan. Aliquam nec eros eu dui porta accumsan lobortis a enim.
          Pellentesque odio metus, ultrices sed elementum ac, blandit id velit.
          Maecenas sed nibh pharetra, pulvinar sapien vitae, commodo augue. Ut a
          elementum augue. Nulla tincidunt felis sit amet est facilisis
          ultricies. Vivamus ut cursus urna, ac lacinia erat. Etiam aliquet
          auctor tortor ut molestie. Morbi lobortis dolor neque. Maecenas sed
          semper justo. Duis pulvinar pulvinar pretium. Proin rhoncus nec risus
          sed accumsan. Aliquam nec eros eu dui porta accumsan lobortis a enim.
        </p>
      </div>
    </div>
  );
};

export default Modal;
