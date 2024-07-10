/* eslint-disable react/prop-types */
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function SettingsInput({ id, defaultValue }) {
  const { isUpdating, updateSetting } = useUpdateSetting();
  function handleUpdate(e, setting) {
    const { value } = e.target;
    if (!value) return;

    updateSetting({
      [setting]: value,
    });
  }

  function updateOnEnterKey(e) {
    if (e.code === "Enter") {
      e.target.blur();
    }
  }
  return (
    <Input
      type="number"
      id={id}
      disabled={isUpdating}
      defaultValue={defaultValue}
      onKeyDown={updateOnEnterKey}
      onBlur={(e) => handleUpdate(e, id)}
    />
  );
}

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <SettingsInput id="minBookingLength" defaultValue={minBookingLength} />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <SettingsInput id="maxBookingLength" defaultValue={maxBookingLength} />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <SettingsInput
          id="maxGuestsPerBooking"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <SettingsInput id="breakfastPrice" defaultValue={breakfastPrice} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
