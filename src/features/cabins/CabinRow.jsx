/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useDuplicateCabin from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
const CabinTools = styled.div`
  display: flex;
  justify-content: space-around;

  button {
    width: 3rem;
    height: 3rem;
  }
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount > 0 ? <Discount>{discount}</Discount> : <span>&mdash;</span>}
      <CabinTools>
        <button onClick={() => duplicateCabin(cabin)} disabled={isDuplicating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit-cabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>

          <Modal.Window name="edit-cabin">
            <CreateCabinForm type="edit" cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete-cabin">
            <button>
              <HiTrash />
            </button>
          </Modal.Open>

          <Modal.Window name="delete-cabin">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName="cabins"
              onConfirm={() => deleteCabin(cabinId)}
            ></ConfirmDelete>
          </Modal.Window>
        </Modal>
      </CabinTools>
    </Table.Row>
  );
}

export default CabinRow;
