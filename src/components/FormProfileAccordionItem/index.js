import React from "react";
import PropTypes from "prop-types";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// import 'react-accessible-accordion/dist/fancy-example.css'
import "./styles.scss";
import styles from "./styles.module.scss";

import FormErrorList from "../FormErrorList";
// import FormInputText from '../FormInputText'
import FormTrailingLink from "../FormTrailingLink";

const renderInput = (
  input,
  i,
  currentTooltip,
  setCurrentTooltip,
  tooltipOffsetElementId
) => {
  const {
    Component,
    label,
    tooltip,
    description,
    instructions,
    id,
    emphasized,
    type,
    setInputState,
    placeholder,
    value,
    required,
    maxLength,
    rows,
    checkboxState,
    setCheckboxState,
    flex,
    icons,
    checkboxes,
    selectedCheckboxes,
    setCheckboxStates,
    radioButtons,
    selectedRadioButtons,
    setRadioButtonsStates,
    errorMessage,
    descriptionId,
    createUniqueIds,
    showInput,
  } = input;
  return (
    <Component
      key={`input-${i}`}
      label={label}
      tooltip={tooltip}
      description={description}
      currentTooltip={currentTooltip}
      setCurrentTooltip={setCurrentTooltip}
      tooltipOffsetElementId={tooltipOffsetElementId}
      instructions={instructions}
      id={id}
      emphasized={emphasized}
      type={type}
      setInputState={setInputState}
      placeholder={placeholder}
      value={value}
      required={required}
      maxLength={maxLength}
      rows={rows}
      checkboxState={checkboxState}
      setCheckboxState={setCheckboxState}
      flex={flex}
      icons={icons}
      checkboxes={checkboxes}
      selectedCheckboxes={selectedCheckboxes}
      setCheckboxStates={setCheckboxStates}
      radioButtons={radioButtons}
      selectedRadioButtons={selectedRadioButtons}
      setRadioButtonsStates={setRadioButtonsStates}
      errorMessage={errorMessage}
      descriptionId={descriptionId}
      formId={!!createUniqueIds ? createUniqueIds : null}
      showInput={showInput}
    />
  );
};

const renderInputs = (
  inputs,
  currentTooltip,
  setCurrentTooltip,
  tooltipOffsetElementId
) => {
  const formInputs = inputs.map((input, i) =>
    renderInput(
      input,
      i,
      currentTooltip,
      setCurrentTooltip,
      tooltipOffsetElementId
    )
  );
  return formInputs;
};

const FormProfileAccordianItem = (props) => {
  const {
    heading,
    intro,
    client,
    ids,
    formId,
    validateForm,
    inputStates,
    setErrorMessages,
    setFormValidated,
    errorMessages,
    formValidatedMessage,
    currentTooltip,
    setCurrentTooltip,
    tooltipOffsetElementId,
    inputs,
    submitValue,
    trailingLink,
  } = props;
  /*
    console.log('%c errorMessages:', 'color: red; font-weight: bold;')
    console.log(errorMessages)
    */
  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>{heading}</AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        {intro &&
          intro.map((para, i) => {
            return <p key={`intro-para-${i}`}>{para}</p>;
          })}
        <form
          className={`profileHubForm`}
          id={formId}
          noValidate
          onSubmit={(e) =>
            validateForm(
              e,
              inputStates,
              setErrorMessages,
              setFormValidated,
              formId,
              client,
              ids
            )
          }
        >
          <FormErrorList formId={formId} errorMessages={errorMessages} />
          {!!formValidatedMessage && (
            <p
              className={`profileHubForm__validated ${styles.profileHubForm__validated}`}
              id={`${formId}-validatedMessage`}
              tabIndex="-1"
            >
              {formValidatedMessage}
            </p>
          )}
          {inputs.map((input, i) => {
            if (!!input.length) {
              return (
                <div
                  key={`profileHubFormInputsDiv-${i}`}
                  className={`profileHubForm__flex ${styles.profileHubForm__flex}`}
                >
                  {renderInputs(
                    input,
                    currentTooltip,
                    setCurrentTooltip,
                    tooltipOffsetElementId
                  )}
                </div>
              );
            } else {
              return renderInput(
                input,
                i,
                currentTooltip,
                setCurrentTooltip,
                tooltipOffsetElementId
              );
            }
          })}
          <input
            className={`profileHubForm__button ${styles.profileHubForm__button}`}
            type="submit"
            value={submitValue}
          />
          {trailingLink && (
            <FormTrailingLink
              route={trailingLink.route}
              label={trailingLink.label}
              tooltip={trailingLink.tooltip || null}
            />
          )}
        </form>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

FormProfileAccordianItem.defaultName = "FormProfileAccordianItem";

FormProfileAccordianItem.propTypes = {
  heading: PropTypes.string.isRequired,
  intro: PropTypes.arrayOf(PropTypes.string),
  formId: PropTypes.string.isRequired,
  validateForm: PropTypes.func.isRequired,
  inputStates: PropTypes.object.isRequired,
  setErrorMessages: PropTypes.func,
  setFormValidated: PropTypes.func.isRequired,
  errorMessages: PropTypes.array,
  formValidatedMessage: PropTypes.string.isRequired,
  currentTooltip: PropTypes.string,
  setCurrentTooltip: PropTypes.func,
  tooltipOffsetElementId: PropTypes.string,
  inputs: PropTypes.array.isRequired,
  submitValue: PropTypes.string.isRequired,
  trailingLink: PropTypes.shape({
    route: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    tooltip: PropTypes.shape({
      id: PropTypes.string.isRequired,
      tip: PropTypes.string.isRequired,
      currentTooltip: PropTypes.string.isRequired,
      setCurrentTooltip: PropTypes.func.isRequired,
      tooltipOffsetElementId: PropTypes.string.isRequired,
    }),
  }),
};

export default FormProfileAccordianItem;
