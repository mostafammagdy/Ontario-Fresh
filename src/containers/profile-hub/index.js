import React, { useState, useEffect, useRef, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import { map, filter, findIndex } from "lodash";
import { Accordion } from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import styles from "./styles.module.scss";

import {
  profileRequest,
  publicProfileRequest,
  deleteConnectionRequest,
  profileFileUploadRequest,
  profileFileDeleteRequest,
} from "../profile/actions";

import { userMessagesRequest } from "../messages/actions";

import {
  PROFILES,
  LOCATIONS_BUSINESS_HOURS_DEFAULT,
  PRODUCT_CATEGORIES,
} from "../../utils/constants-unmutables";
// import { LOCATIONS_BUSINESS_HOURS_DEFAULT } from '../../utils/constants-unmutables'
import { validateGeneralBusinessInformationForm } from "./validation-scripts/general-business-information";
import { validateSocialMediaForm } from "./validation-scripts/social-media";
import { validatePublicVendorProfileHighlightsForm } from "./validation-scripts/public-vendor-profile-highlights";
import { validateUploadCompanyLogoPhotoForm } from "./validation-scripts/upload-company-logo-photo";
import {
  validatePhotoGalleryAttachmentUploadForm,
  validateManagePhotoGalleryAttachmentsForm,
} from "./validation-scripts/photo-gallery-attachments";
import { validateDeliveryDetailsForm } from "./validation-scripts/delivery-details";
import { validateBusinessCategoriesForm } from "./validation-scripts/business-categories";
import { validateSellerSpecificDetailsForm } from "./validation-scripts/seller-specific-details";
import {
  validateProfileAttachmentUploadForm,
  validateManageProfileAttachmentsForm,
} from "./validation-scripts/profile-attachments";
import { validateBuyerSpecificDetailsForm } from "./validation-scripts/buyer-specific-details";
import { validateServicesForm } from "./validation-scripts/services";
import { validateFoodSafetyTraceabilityStandardsForm } from "./validation-scripts/food-safety-traceability-standards";
import { validateProcessorSpecificDetailsForm } from "./validation-scripts/processor-specific-details";

import FormCheckboxesGroup from "../../components/FormCheckboxesGroup";
import FormRadioButtonsGroup from "../../components/FormRadioButtonsGroup";
import FormProfileAccordianItem from "../../components/FormProfileAccordionItem";
import FormProfileAccordianMultipleItems from "../../components/FormProfileAccordionMultipleItems";
import FormProductSelector from "../../components/FormProductSelector";
import FormAttachmentsAccordionItem from "../../components/FormAttachmentsAccordionItem";
import FormInputText from "../../components/FormInputText";
import FormCheckbox from "../../components/FormCheckboxesGroup/FormCheckbox";

const PROFILES_ORDER = [
  "vendor",
  "seller",
  "processor",
  "buyer",
  "service_provider",
];

const updateProductList = (newProducts, setProducts) => {
  setProducts([...newProducts]);
};

const determineIfProfilePresent = (usersProfiles, profile) => {
  const isProfile = usersProfiles.filter((up) => up === profile);
  return isProfile.length === 1;
};

// const determineIfProfilePresent = (usersProfiles, profile) => usersProfiles[profile]

const ProfileHub = (props) => {
  const {
    previousCompanyLogoPhoto,
    previousPhotoGalleryAttachments,
    profilesBusinessCategories,
    previousProfileAttachments,
    productCategories,
    client,
    profile,
  } = props;

  /*
    console.log('%c <Profile />’s props:', 'color: red; font-weight: bold;')
    console.log({ client, profile })
    */
  /*
    console.log('%c <Profile />’s props.params.slug:', 'color: red; font-weight: bold;')
    console.log({ params_slug: props.params.slug })
    */

  const [locationPrefix, setLocationPrefix] = useState("www");
  const [slug, setSlug] = useState("");

  const [ids, setIds] = useState({
    profile_current_id: "",
    buyer_role_id: "",
    buyer_classification_id: "",
    buyer_payment_methods_id: "",
    buyer_safety_standards_id: "",
    seller_role_id: "",
    seller_classification_id: "",
    seller_payment_methods_id: "",
    seller_safety_standards_id: "",
    vendor_role_id: "",
    vendor_highlight_id: "",
    vendor_classification_id: "",
    processor_role_id: "",
    processor_classification_id: "",
    processor_processing_types_id: "",
    processor_market_types_id: "",
    processor_safety_standards_id: "",
    serviceProvider_services_needed_id: "",
    serviceProvider_services_provided_id: "",
  });
  /*
    console.log('%c ids:', 'color: purple; font-weight: bold;')
    console.log({ ids })
    */

  const [usersProfiles, setUsersProfiles] = useState([]);
  /*
    console.log('%c usersProfiles:', 'color: red; font-weight: bold;')
    console.log(usersProfiles)
    */

  // const prevParamsSlugRef = useRef(null)

  const shuffleCurrentProfiles = (currentProfiles) => {
    const usersCurrentProfilesShuffled = [];
    PROFILES_ORDER.forEach((profile) => {
      currentProfiles.forEach((currentProfile) => {
        if (profile === currentProfile)
          usersCurrentProfilesShuffled.push(currentProfile);
      });
    });
    return usersCurrentProfilesShuffled;
  };

  // NOTE: The following method is just temporary.
  const updateUsersProfiles = (event, profile) => {
    event.preventDefault();
    /*
        console.log('%c usersProfiles:', 'color: blue; font-weight: bold;')
        console.log(usersProfiles)
        console.log('%c profile:', 'color: purple; font-weight: bold;')
        console.log({ profile })
        */
    const isProfilePresent = usersProfiles.find((up) => up === profile);
    let newUsersProfiles = [];
    if (isProfilePresent)
      newUsersProfiles = usersProfiles.filter((up) => up !== profile);
    else newUsersProfiles = [...usersProfiles, profile];
    const newUsersProfilesShuffled = shuffleCurrentProfiles(newUsersProfiles);
    if (newUsersProfiles.length > 0)
      setUsersProfiles([...newUsersProfilesShuffled]);
  };

  const sellerIndex = usersProfiles.findIndex((up) => up === "seller");
  const buyerIndex = usersProfiles.findIndex((up) => up === "buyer");
  const vendorIndex = usersProfiles.findIndex((up) => up === "vendor");
  const processorIndex = usersProfiles.findIndex((up) => up === "processor");
  const serviceProviderIndex = usersProfiles.findIndex(
    (up) => up === "service_provider"
  );

  // From <Profile />
  const getProfile = () => {
    const { client, profileRequest, publicProfileRequest, params } = props;
    /*
        console.log('%c Profile getProfile props:', 'color: blue; font-weight: bold;')
        console.log({ client, profileRequest, publicProfileRequest, params })
        */

    if (params.slug) return publicProfileRequest(client, params.slug);
    else if (client && client.token) return profileRequest(client);
    return false;
  };

  const isBuyer = determineIfProfilePresent(usersProfiles, "buyer");
  const isSeller = determineIfProfilePresent(usersProfiles, "seller");
  const isVendor = determineIfProfilePresent(usersProfiles, "vendor");
  const isProcessor = determineIfProfilePresent(usersProfiles, "processor");
  const isServiceProvider = determineIfProfilePresent(
    usersProfiles,
    "service_provider"
  );
  const [currentTooltip, setCurrentTooltip] = useState("");
  /*
    console.log('%c isVendor:', 'color: blue; font-weight: bold;')
    console.log({ isVendor })
    */
  /*
    // useState() hook for the Profiles checkbox inputs.
    const [ selectedProfiles, setSelectedProfiles ] = useState({
        buyer: false,
        seller: false,
        vendor: false,
        processor: false,
        service_provider: false
    })
    /*
    console.log('%c selectedProfiles:', 'color: red; font-weight: bold;')
    console.log(selectedProfiles)
    *
    // useState() hook for the form’s error messages.
   const [ errorMessages, setErrorMessages ] = useState({
       profileCheckboxes: null,
       messageList: []
   })
   */

  // useState() hook for the Business Name text input.
  const [inputBusinessName, setInputBusinessName] = useState("");
  // useState() hook for the First Name text input.
  const [inputFirstName, setInputFirstName] = useState("");
  // useState() hook for the Last Name text input.
  const [inputLastName, setInputLastName] = useState("");
  // useState() hook for the Title text input.
  const [inputTitle, setInputTitle] = useState("");
  // useState() hook for the Ontario Address text input.
  const [inputOntarioAddress, setInputOntarioAddress] = useState("");
  // useState() hook for the City/Town text input.
  const [inputCityTown, setInputCityTown] = useState("");
  // useState() hook for the Postal Code text input.
  const [inputPostalCode, setInputPostalCode] = useState("");
  // useState() hook for the Are you located in the greenbelt region? checkbox.
  const [checkboxGreenbeltRegion, setCheckboxGreenbeltRegion] = useState({
    greenbeltRegion: false,
  });
  // useState() hook for the Email text input.
  const [inputEmail, setInputEmail] = useState("");
  // useState() hook for the FAX text input.
  const [inputFax, setInputFax] = useState("");
  // useState() hook for the Phone Number text input.
  const [inputPhone, setInputPhone] = useState("");
  // useState() hook for the Business Description textarea input.
  const [inputBusinessDescription, setInputBusinessDescription] = useState("");
  // useState() hook for the Hide personal Info (Email and phone number) checkbox.
  const [checkboxHidePersonalInfo, setCheckboxHidePersonalInfo] = useState({
    hidePersonalInfo: false,
  });

  // useState() hook for the Specific Directions textarea input.
  const [inputVendorSpecificDirections, setInputVendorSpecificDirections] =
    useState("");
  const [selectedVendorSeasons, setSelectedVendorSeasons] = useState({
    is_open_spring: false,
    is_open_summer: false,
    is_open_fall: false,
    is_open_winter: false,
    is_open_year_round: false,
  });
  // useState() hook for the Business Hours text input.
  const [inputVendorFurtherDetails, setInputVendorFurtherDetails] =
    useState("");

  // useState() hook for the generalBusinessInformationForm’s error messages.
  const [
    generalBusinessInformationFormErrorMessages,
    setGeneralBusinessInformationFormErrorMessages,
  ] = useState({
    businessName: null,
    firstName: null,
    lastName: null,
    ontarioAddress: null,
    cityTown: null,
    postalCode: null,
    email: null,
    businessDescription: null,

    messageList: [],
  });
  /*
   useState() hook to display the General Business Information form’s validation confirmation message when the form is being/has been submitted.
   */
  const [
    generalBusinessInformationFormValidated,
    setGeneralBusinessInformationFormValidated,
  ] = useState("");

  const generalBusinessInformationInputs = [
    [
      {
        Component: FormInputText,
        label: "First Name",
        id: "firstName",
        type: "text",
        setInputState: setInputFirstName,
        value: inputFirstName,
        required: true,
        errorMessage: generalBusinessInformationFormErrorMessages["firstName"],
      },
      {
        Component: FormInputText,
        label: "Last Name",
        id: "lastName",
        type: "text",
        setInputState: setInputLastName,
        value: inputLastName,
        required: true,
        errorMessage: generalBusinessInformationFormErrorMessages["lastName"],
      },
      {
        Component: FormInputText,
        label: "Job Title",
        id: "title",
        type: "text",
        setInputState: setInputTitle,
        value: inputTitle,
        required: true,
        errorMessage: generalBusinessInformationFormErrorMessages["title"],
      },
      {
        Component: FormInputText,
        label: "Business Name",
        id: "businessName",
        type: "text",
        setInputState: setInputBusinessName,
        value: inputBusinessName,
        required: true,
        errorMessage:
          generalBusinessInformationFormErrorMessages["businessName"],
      },
      {
        Component: FormInputText,
        label: "Ontario Address",
        id: "ontarioAddress",
        type: "text",
        setInputState: setInputOntarioAddress,
        value: inputOntarioAddress,
        required: false,
        errorMessage:
          generalBusinessInformationFormErrorMessages["ontarioAddress"],
      },
      {
        Component: FormInputText,
        label: "City/Town",
        id: "cityTown",
        type: "text",
        setInputState: setInputCityTown,
        value: inputCityTown,
        required: false,
        errorMessage: generalBusinessInformationFormErrorMessages["cityTown"],
      },
      {
        Component: FormInputText,
        label: "Postal Code",
        id: "postalCode",
        type: "text",
        setInputState: setInputPostalCode,
        value: inputPostalCode,
        required: false,
        errorMessage: generalBusinessInformationFormErrorMessages["postalCode"],
      },
    ],
    {
      Component: FormCheckbox,
      label: "Are you located in Ontario’s Greenbelt?",
      description:
        'View the <a href="https://www.greenbelt.ca/maps" target="_blank" rel="noopener noreferrer">Greenbelt Map</a> for reference.',
      value: "greenbeltRegion",
      checkboxState: checkboxGreenbeltRegion,
      setCheckboxState: setCheckboxGreenbeltRegion,
    },
    [
      {
        Component: FormInputText,
        label: "Email",
        id: "email",
        type: "email",
        setInputState: setInputEmail,
        value: inputEmail,
        required: true,
        errorMessage: generalBusinessInformationFormErrorMessages["email"],
      },
      {
        Component: FormInputText,
        label: "FAX",
        id: "fax",
        type: "tel",
        setInputState: setInputFax,
        value: inputFax,
      },
      {
        Component: FormInputText,
        label: "Phone Number",
        id: "phone",
        type: "tel",
        setInputState: setInputPhone,
        value: inputPhone,
      },
    ],
    {
      Component: FormCheckbox,
      label:
        "Hide personal information from public view (first and last name and email)",
      value: "hidePersonalInfo",
      checkboxState: checkboxHidePersonalInfo,
      setCheckboxState: setCheckboxHidePersonalInfo,
      showInput: isVendor,
    },
    {
      Component: FormInputText,
      label: "Business Description",
      tooltip:
        "Please note the first 128 characters will be displayed on the search results page.",
      id: "businessDescription",
      type: "textarea",
      setInputState: setInputBusinessDescription,
      value: inputBusinessDescription,
      required: false,
      rows: 4,
      errorMessage:
        generalBusinessInformationFormErrorMessages["businessDescription"],
    },
  ];

  if (isVendor) {
    generalBusinessInformationInputs.push(
      {
        Component: FormInputText,
        label: "Specific directions (if required)",
        id: "specific_directions",
        type: "textarea",
        setInputState: setInputVendorSpecificDirections,
        value: inputVendorSpecificDirections,
        required: false,
        rows: 2,
      },
      {
        Component: FormCheckboxesGroup,
        label: "Which seasons are you open?",
        id: "vendorSeasonsCheckboxes",
        checkboxes: [
          {
            label: "Spring",
            value: "is_open_spring",
          },
          {
            label: "Summer",
            value: "is_open_summer",
          },
          {
            label: "Fall",
            value: "is_open_fall",
          },
          {
            label: "Winter",
            value: "is_open_winter",
          },
          {
            label: "Year Round",
            value: "is_open_year_round",
          },
        ],
        selectedCheckboxes: selectedVendorSeasons,
        setCheckboxStates: setSelectedVendorSeasons,
      },
      {
        Component: FormInputText,
        label: "Business Hours (250 character limit)",
        tooltip:
          "Provide further information regarding your operating hours. For example: Monday-Saturday 8am-8pm.",
        id: "business_hour_details",
        type: "textarea",
        setInputState: setInputVendorFurtherDetails,
        value: inputVendorFurtherDetails,
        required: false,
        rows: 7,
        maxLength: 250,
      }
    );
  }

  // useState() hook for the Website url input.
  const [inputWebsite, setInputWebsite] = useState("");
  // useState() hook for the Online store url input.
  const [inputOnlineStore, setInputOnlineStore] = useState("");
  // useState() hook for the Facebook url input.
  const [inputFacebook, setInputFacebook] = useState("");
  // useState() hook for the Instagram url input.
  const [inputInstagram, setInputInstagram] = useState("");
  // useState() hook for the Twitter url input.
  const [inputTwitter, setInputTwitter] = useState("");
  // useState() hook for the LinkedIn url input.
  const [inputLinkedIn, setInputLinkedIn] = useState("");
  // useState() hook for the YouTube url input.
  const [inputYouTube, setInputYouTube] = useState("");
  // useState() hook for the socialMediaForm’s error messages.
  const [socialMediaFormErrorMessages, setSocialMediaFormErrorMessages] =
    useState({
      website: null,
      onlineStore: null,
      facebook: null,
      instagram: null,
      twitter: null,
      linkedIn: null,
      youTube: null,
      messageList: [],
    });

  /*
   useState() hook to display the General Business Information form’s validation confirmation message when the form is being/has been submitted.
   */
  const [socialMediaFormValidated, setSocialMediaFormValidated] = useState("");

  // useState() hook for the B2C/Vendor Icons checkbox inputs.
  const [selectedVendorIcons, setSelectedVendorIcons] = useState({
    online_store: false,
    delivery: false,
    organic: false,
    halal: false,
    kosher: false,
    open_year_round: false,
    open_seasonaly: false,
    fruits_vegetables: false,
    meat: false,
    fish: false,
    dairy_eggs: false,
    nuts_seeds_herbs: false,
    prepared_food: false,
    alcoholic_beverages: false,
    non_alcoholic_beverages: false,
    grains: false,
  });
  /*
    console.log('%c b2cVendorIcons:', 'color: red; font-weight: bold;')
    console.log(b2cVendorIcons)
    */
  // useState() hook for the B2C/Vendor Icons checkbox inputs.
  const [selectedProfileMasthead, setSelectedProfileMasthead] = useState("");
  /*
    console.log('%c selectedProfileMasthead:', 'color: red; font-weight: bold;')
    console.log(selectedProfileMasthead)
    */
  // useState() hook for the B2C/Vendor Icons checkbox inputs.
  const [selectedBusinessClassifications, setSelectedBusinessClassifications] =
    useState({
      sp_appropriate_for_allergies_special_diets: false,
      sp_certified_organic: false,
      sp_halal: false,
      sp_kosher: false,
      sp_specialty: false,
    });
  // useState() hook for the form’s error messages.
  const [
    publicVendorProfileHighlightsFormErrorMessages,
    setPublicVendorProfileHighlightsFormErrorMessages,
  ] = useState({
    vendorIconsCheckboxes: null,
    profileMastheadRadioButtons: null,
    messageList: [],
  });
  /*
   useState() hook to display the Public B2C / Vendor Profile Highlights form’s validation confirmation message when the form is being/has been submitted.
   */
  const [
    publicVendorProfileHighlightsFormValidated,
    setPublicVendorProfileHighlightsFormValidated,
  ] = useState("");

  const [companyLogoPhoto, setCompanyLogoPhoto] = useState(
    previousCompanyLogoPhoto || ""
  );
  /*
    console.log('%c companyLogoPhoto:', 'color: red; font-weight: bold;')
    console.log({ companyLogoPhoto })
    */
  // useState() hook for the form’s error messages
  const [
    companyLogoPhotoFormErrorMessage,
    setCompanyLogoPhotoFormErrorMessage,
  ] = useState("");
  /*
    useState() hook to display the Profile Attachments form’s validation confirmation message when the form is being/has been submitted.
    */
  const [companyLogoPhotoFormValidated, setCompanyLogoPhotoFormValidated] =
    useState("");

  const [photoGalleryAttachments, setPhotoGalleryAttachments] = useState([]);
  /*
    console.log('%c photoGalleryAttachments:', 'color: brown; font-weight: bold;')
    console.log({ photoGalleryAttachments })
    */

  // useState() hook for the form’s error messages
  const [
    photoGalleryAttachmentsFormErrorMessage,
    setPhotoGalleryAttachmentsFormErrorMessage,
  ] = useState("");
  /*
    useState() hook to display the Profile Attachments form’s validation confirmation message when the form is being/has been submitted.
    */
  const [
    photoGalleryAttachmentsFormValidated,
    setPhotoGalleryAttachmentsFormValidated,
  ] = useState("");

  const createSelectedPhotoGalleryAttachmentsCheckboxes = {};
  photoGalleryAttachments.forEach((pga) => {
    for (const [key, value] of Object.entries(pga)) {
      if (key === "id") {
        createSelectedPhotoGalleryAttachmentsCheckboxes[value] = false;
      }
    }
  });
  const [selectedPhotoGalleryAttachments, setSelectedPhotoGalleryAttachments] =
    useState({ ...createSelectedPhotoGalleryAttachmentsCheckboxes });
  /*
    console.log('%c selectedPhotoGalleryAttachments:', 'color: red; font-weight: bold;')
    console.log({ selectedPhotoGalleryAttachments })
    */
  // useState() hook for the form’s error messages
  const [
    selectedPhotoGalleryAttachmentsFormErrorMessage,
    setSelectedPhotoGalleryAttachmentsFormErrorMessage,
  ] = useState("");
  /*
    useState() hook to display the Profile Attachments form’s validation confirmation message when the form is being/has been submitted.
    */
  const [
    selectedPhotoGalleryAttachmentsFormValidated,
    setSelectedPhotoGalleryAttachmentsFormValidated,
  ] = useState("");
  /*
    console.log('%c selectedPhotoGalleryAttachmentsFormValidated:', 'color: red; font-weight: bold;')
    console.log({ selectedPhotoGalleryAttachmentsFormValidated })
    */

  const [locationsBusinessHours, setLocationsBusinessHours] = useState([]);
  /*
    if (locationsBusinessHours.length < 2 && !locationsBusinessHours[0].primaryLocation) {
        // console.log('%c RUNNING LOOP!!!', 'color: purple; font-weight: bold;')
        const updatedLocations = [ ...locationsBusinessHours ]
        updatedLocations[0].primaryLocation = true
        setLocationsBusinessHours([ ...updatedLocations ])
    }
    */
  /*
    console.log('%c locationsBusinessHours:', 'color: red; font-weight: bold;')
    console.log(locationsBusinessHours)
    */
  // const [ checkboxDeliveryDetailsBuyerOfferDelivery, setCheckboxDeliveryDetailsBuyerOfferDelivery ] = useState({ negotiable: false })
  const [
    selectedDeliveryDetailsBuyerOfferDelivery,
    setSelectedDeliveryDetailsBuyerOfferDelivery,
  ] = useState("2");
  // const [ checkboxDeliveryDetailsSellerOfferDelivery, setCheckboxDeliveryDetailsSellerOfferDelivery ] = useState({ negotiable: false })
  const [
    selectedDeliveryDetailsSellerOfferDelivery,
    setSelectedDeliveryDetailsSellerOfferDelivery,
  ] = useState("2");
  // const [ checkboxDeliveryDetailsVendorOfferDelivery, setCheckboxDeliveryDetailsVendorOfferDelivery ] = useState({ negotiable: false })
  const [
    selectedDeliveryDetailsVendorOfferDelivery,
    setSelectedDeliveryDetailsVendorOfferDelivery,
  ] = useState("2");
  const [
    inputDeliveryDetailsVendorFurtherDetails,
    setInputDeliveryDetailsVendorFurtherDetails,
  ] = useState(""); // useState() hook for the form’s error messages.
  // const [ checkboxDeliveryDetailsProcessorOfferDelivery, setCheckboxDeliveryDetailsProcessorOfferDelivery ] = useState({ negotiable: false })
  const [
    selectedDeliveryDetailsProcessorOfferDelivery,
    setSelectedDeliveryDetailsProcessorOfferDelivery,
  ] = useState("2");
  // useState() hook for the form’s error messages.
  /*
    const [ deliveryDetailsFormErrorMessages, setDeliveryDetailsFormErrorMessages ] = useState({
        deliveryDetailsBuyerRadioButtons: null,
        deliveryDetailsSellerRadioButtons: null,
        deliveryDetailsVendorRadioButtons: null,
        deliveryDetailsProcessorRadioButtons: null,
        messageList: []
    })
    */
  const deliveryDetailsFieldsets = {
    buyer: [
      {
        Component: FormRadioButtonsGroup,
        label: "As a Buyer, please indicate whether you require delivery:",
        id: "deliveryDetailsBuyerRadioButtons",
        radioButtons: [
          {
            label: "Yes",
            group: "deliveryDetailsBuyerRadioButtons",
            value: "1",
          },
          {
            label: "No",
            group: "deliveryDetailsBuyerRadioButtons",
            value: "2",
          },
          {
            label: "Negotiable",
            group: "deliveryDetailsBuyerRadioButtons",
            value: "3",
          },
        ],
        selectedRadioButtons: selectedDeliveryDetailsBuyerOfferDelivery,
        setRadioButtonsStates: setSelectedDeliveryDetailsBuyerOfferDelivery,
        createUniqueIds: "buyerDeliveryDetailsForm",
      },
    ],
    seller: [
      {
        Component: FormRadioButtonsGroup,
        label: "As a Seller, please indicate whether you offer delivery:",
        id: "deliveryDetailsSellerRadioButtons",
        radioButtons: [
          {
            label: "Yes",
            group: "deliveryDetailsSellerRadioButtons",
            value: "1",
          },
          {
            label: "No",
            group: "deliveryDetailsSellerRadioButtons",
            value: "2",
          },
          {
            label: "Negotiable",
            group: "deliveryDetailsSellerRadioButtons",
            value: "3",
          },
        ],
        selectedRadioButtons: selectedDeliveryDetailsSellerOfferDelivery,
        setRadioButtonsStates: setSelectedDeliveryDetailsSellerOfferDelivery,
        createUniqueIds: "sellerDeliveryDetailsForm",
      },
    ],
    vendor: [
      {
        Component: FormRadioButtonsGroup,
        label: "As a Vendor, please indicate whether you offer delivery:",
        id: "deliveryDetailsVendorRadioButtons",
        radioButtons: [
          {
            label: "Yes",
            group: "deliveryDetailsVendorRadioButtons",
            value: "1",
          },
          {
            label: "No",
            group: "deliveryDetailsVendorRadioButtons",
            value: "2",
          },
        ],
        selectedRadioButtons: selectedDeliveryDetailsVendorOfferDelivery,
        setRadioButtonsStates: setSelectedDeliveryDetailsVendorOfferDelivery,
        createUniqueIds: "vendorDeliveryDetailsForm",
      },
      {
        Component: FormInputText,
        label: "Further Details (250 characters)",
        tooltip:
          "Please indicate your delivery details. For example, “Delivery available within the GTA.”",
        id: "deliveryDetailsVendorFurtherDetails",
        type: "textarea",
        setInputState: setInputDeliveryDetailsVendorFurtherDetails,
        value: inputDeliveryDetailsVendorFurtherDetails,
        maxLength: 250,
      },
    ],
    processor: [
      {
        Component: FormRadioButtonsGroup,
        label: "As a Processor, please indicate whether you offer delivery:",
        id: "deliveryDetailsProcessorRadioButtons",
        radioButtons: [
          {
            label: "Yes",
            group: "deliveryDetailsProcessorRadioButtons",
            value: "1",
          },
          {
            label: "No",
            group: "deliveryDetailsProcessorRadioButtons",
            value: "2",
          },
          {
            label: "Negotiable",
            group: "deliveryDetailsProcessorRadioButtons",
            value: "3",
          },
        ],
        selectedRadioButtons: selectedDeliveryDetailsProcessorOfferDelivery,
        setRadioButtonsStates: setSelectedDeliveryDetailsProcessorOfferDelivery,
        createUniqueIds: "processorDeliveryDetailsForm",
      },
    ],
  };
  const usersDeliveryDetailsFieldsets = [];
  usersProfiles.forEach((up) => {
    if (up !== "service_provider")
      usersDeliveryDetailsFieldsets.push(...deliveryDetailsFieldsets[up]);
  });
  const [deliveryDetailsFormValidated, setDeliveryDetailsFormValidated] =
    useState("");

  // useState() hook for the B2C/Vendor Icons checkbox inputs.
  const [selectedBusinessCaterories, setSelectedBusinessCategories] = useState({
    aggregator_or_hub: false,
    agricultural_assoc: false,
    agritourism: false,
    bakery: false,
    brewery: false,
    buyer: false,
    chef: false,
    cidery: false,
    co_op: false,
    community_agriculture: false,
    custom_processor: false,
    distillery: false,
    distributor: false,
    equip_machinery_sales: false,
    farmers_market: false,
    food_bank: false,
    food_service_provider: false,
    government: false,
    greenhouse: false,
    grocery_store: false,
    group_purchasing: false,
    grower_producer: false,
    input_provider: false,
    institution: false,
    logistics: false,
    marketing_advertising: false,
    nursery: false,
    on_farm_market: false,
    other_agriculture: false,
    other_support_industry: false,
    packaging_shipping: false,
    packer: false,
    pick_your_own: false,
    processor: false,
    regional_food_network: false,
    restaurant: false,
    retail_operator_shop: false,
    school_supplier_vendor: false,
    school_or_cafeteria: false,
    seller: false,
    transportation_climate_control: false,
    wholesale: false,
    winery: false,
  });
  const businessCategoriesCheckboxes = [];
  profilesBusinessCategories.forEach((pbc, i) => {
    if (pbc.profile === "all") {
      businessCategoriesCheckboxes.push({
        label: pbc.label,
        value: pbc.value,
      });
    } else if (
      pbc.profile === "b2b" &&
      (isBuyer || isSeller || isProcessor || isServiceProvider)
    ) {
      businessCategoriesCheckboxes.push({
        label: pbc.label,
        value: pbc.value,
      });
    } else {
      usersProfiles.forEach((up, j) => {
        if (up === pbc.profile) {
          businessCategoriesCheckboxes.push({
            label: pbc.label,
            value: pbc.value,
          });
        }
      });
    }
  });
  // useState() hook for the form’s error messages.
  /*
    const [ businessCateroriesFormErrorMessages, setBusinessCateroriesFormErrorMessages ] = useState({
        businessCategoriesCheckboxes: null,
        messageList: []
    })
    */
  /*
   useState() hook to display the Public B2C / Vendor Profile Highlights form’s validation confirmation message when the form is being/has been submitted.
   */
  const [businessCateroriesFormValidated, setBusinessCateroriesFormValidated] =
    useState("");

  // useState() hook for the Products Selector products list.
  const [products, setProducts] = useState([...PRODUCT_CATEGORIES]);

  console.log("%c products:", "color: blue; font-weight: bold;");
  console.log({ products });

  // useState() hook for the Seller Specific Details checkbox inputs.
  const [
    selectedSellerBusinessClassifications,
    setSelectedSellerBusinessClassifications,
  ] = useState({
    appropriate_for_allergies_special_diets: false,
    certified_organic: false,
    halal: false,
    kosher: false,
    specialty: false,
  });
  const [
    selectedSellerPreferredPaymentMethods,
    setSelectedSellerPreferredPaymentMethods,
  ] = useState({
    visa_debit: false,
    cod: false,
    invoice_po: false,
  });
  const [selectedSellerBusinessSize, setSelectedSellerBusinessSize] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [
    selectedSellerThirdPartyInsurance,
    setSelectedSellerThirdPartyInsurance,
  ] = useState({
    yes: false,
    no: false,
  });
  // useState() hook for the form’s error messages.
  const [
    sellerSpecificDetailsFormErrorMessages,
    setSellerSpecificDetailsFormErrorMessages,
  ] = useState({
    sellerBusinessSizeCheckboxes: null,
    sellerThirdPartyInsuranceCheckboxes: null,
    messageList: [],
  });
  /*
   useState() hook to display the Seller Specific Details form’s validation confirmation message when the form is being/has been submitted.
   */
  const [
    sellerSpecificDetailsFormValidated,
    setSellerSpecificDetailsFormValidated,
  ] = useState("");

  const [profileAttachments, setProfileAttachments] = useState([]);
  /*
    console.log('%c profileAttachments:', 'color: red; font-weight: bold;')
    console.log({ profileAttachments })
    */
  // useState() hook for the form’s error messages
  const [
    profileAttachmentsFormErrorMessage,
    setProfileAttachmentsFormErrorMessage,
  ] = useState("");
  /*
    useState() hook to display the Profile Attachments form’s validation confirmation message when the form is being/has been submitted.
    */
  const [profileAttachmentsFormValidated, setProfileAttachmentsFormValidated] =
    useState("");

  const createSelectedProfileAttachmentsCheckboxes = {};
  profileAttachments.forEach((pa) => {
    for (const [key, value] of Object.entries(pa)) {
      if (key === "id") {
        createSelectedProfileAttachmentsCheckboxes[value] = false;
      }
    }
  });
  const [selectedProfileAttachments, setSelectedProfileAttachments] = useState({
    ...createSelectedProfileAttachmentsCheckboxes,
  });
  /*
    console.log('%c selectedProfileAttachments:', 'color: red; font-weight: bold;')
    console.log({ selectedProfileAttachments })
    */
  // useState() hook for the form’s error messages
  const [
    selectedProfileAttachmentsFormErrorMessage,
    setSelectedProfileAttachmentsFormErrorMessage,
  ] = useState("");
  /*
    useState() hook to display the Profile Attachments form’s validation confirmation message when the form is being/has been submitted.
    */
  const [
    selectedProfileAttachmentsFormValidated,
    setSelectedProfileAttachmentsFormValidated,
  ] = useState("");

  // useState() hook for the Buyer Specific Details checkbox inputs.
  const [
    selectedBuyerBusinessClassifications,
    setSelectedBuyerBusinessClassifications,
  ] = useState({
    appropriate_for_allergies_special_diets: false,
    certified_organic: false,
    halal: false,
    kosher: false,
    specialty: false,
  });
  /*
    const [ selectedBuyerThirdPartyInsurance, setSelectedBuyerThirdPartyInsurance ] = useState({
        third_party_insurance: false
    })
    */
  const [
    selectedBuyerPreferredPaymentMethods,
    setSelectedBuyerPreferredPaymentMethods,
  ] = useState({
    visa_debit: false,
    cod: false,
    invoice_po: false,
  });
  const [selectedBuyerBusinessSize, setSelectedBuyerBusinessSize] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [
    selectedBuyerThirdPartyInsurance,
    setSelectedBuyerThirdPartyInsurance,
  ] = useState({
    yes: false,
    no: false,
  });
  // useState() hook for the form’s error messages.
  const [
    buyerSpecificDetailsFormErrorMessages,
    setBuyerSpecificDetailsFormErrorMessages,
  ] = useState({
    buyerBusinessSizeCheckboxes: null,
    buyerThirdPartyInsuranceCheckboxes: null,
    messageList: [],
  });
  /*
   useState() hook to display the Buyer Specific Details form’s validation confirmation message when the form is being/has been submitted.
   */
  const [
    buyerSpecificDetailsFormValidated,
    setBuyerSpecificDetailsFormValidated,
  ] = useState("");

  // useState() hook for the Services checkbox inputs.
  const [selectedServicesOffered, setSelectedServicesOffered] = useState({
    abattoir_services_meat: false,
    advertising_marketing_promotions: false,
    cold_storage_refrigerated_warehousing: false,
    consolidation_aggregation_hub_services: false,
    delivery: false,
    frozen_storage: false,
    full_serviced_distribution: false,
    other_specialized_storage: false,
    post_harvest_handling_or_packing: false,
    processing: false,
    sharing_purchase_orders: false,
    transportation_and_climate_control: false,
    warehousing: false,
  });
  const [selectedServicesWanted, setSelectedServicesWanted] = useState({
    abattoir_services_meat: false,
    advertising_marketing_promotions: false,
    cold_storage_refrigerated_warehousing: false,
    consolidation_aggregation_hub_services: false,
    delivery: false,
    frozen_storage: false,
    full_serviced_distribution: false,
    other_specialized_storage: false,
    post_harvest_handling_or_packing: false,
    processing: false,
    sharing_purchase_orders: false,
    transportation_and_climate_control: false,
    warehousing: false,
  });
  /*
   useState() hook to display the Buyer Specific Details form’s validation confirmation message when the form is being/has been submitted.
   */
  const [servicesFormValidated, setServicesFormValidated] = useState("");

  // useState() hook for the Offered Food Safety and Traceability Standards checkbox inputs.
  /*
    const [ selectedOfferedFoodSafetyTraceabilityStandards, setSelectedOfferedFoodSafetyTraceabilityStandards ] = useState({
        brc: false,
        can_trace: false,
        fpa_safe: false,
        federally_inspected: false,
        gap: false,
        gmp: false,
        gfcp: false,
        global_gap: false,
        haccp: false,
        iso: false,
        ppm150: false,
        provincially_inspected: false,
        sqf: false,
        sqf_1000: false,
        sqf_2000: false,
        vqa: false,
        beer_tbd: false,
        cider_tbd: false,
        distillery_tbd: false,
        none: false,
    })
    */

  // useState() hook for the Offered Food Safety and Traceability Standards checkbox inputs.
  /*
    const [ selectedRequiredFoodSafetyTraceabilityStandards, setSelectedRequiredFoodSafetyTraceabilityStandards ] = useState({
        brc: false,
        can_trace: false,
        fpa_safe: false,
        federally_inspected: false,
        gap: false,
        gmp: false,
        gfcp: false,
        global_gap: false,
        haccp: false,
        iso: false,
        ppm150: false,
        provincially_inspected: false,
        sqf: false,
        sqf_1000: false,
        sqf_2000: false,
        vqa: false,
        beer_tbd: false,
        cider_tbd: false,
        distillery_tbd: false,
        none: false,
    })
    */

  // useState() hook for the Offered Food Safety and Traceability Standards checkbox inputs.
  const [
    selectedSellerRequiredFoodSafetyTraceabilityStandards,
    setSelectedSellerRequiredFoodSafetyTraceabilityStandards,
  ] = useState({
    brc: false,
    can_trace: false,
    fpa_safe: false,
    federally_inspected: false,
    gap: false,
    gmp: false,
    gfcp: false,
    global_gap: false,
    haccp: false,
    iso: false,
    ppm150: false,
    provincially_inspected: false,
    sqf: false,
    sqf_1000: false,
    sqf_2000: false,
    vqa: false,
    beer_tbd: false,
    cider_tbd: false,
    distillery_tbd: false,
    none: false,
  });

  // useState() hook for the Offered Food Safety and Traceability Standards checkbox inputs.
  const [
    selectedBuyerRequiredFoodSafetyTraceabilityStandards,
    setSelectedBuyerRequiredFoodSafetyTraceabilityStandards,
  ] = useState({
    brc: false,
    can_trace: false,
    fpa_safe: false,
    federally_inspected: false,
    gap: false,
    gmp: false,
    gfcp: false,
    global_gap: false,
    haccp: false,
    iso: false,
    ppm150: false,
    provincially_inspected: false,
    sqf: false,
    sqf_1000: false,
    sqf_2000: false,
    vqa: false,
    beer_tbd: false,
    cider_tbd: false,
    distillery_tbd: false,
    none: false,
  });

  // useState() hook for the Offered Food Safety and Traceability Standards checkbox inputs.
  const [
    selectedProcessorRequiredFoodSafetyTraceabilityStandards,
    setSelectedProcessorRequiredFoodSafetyTraceabilityStandards,
  ] = useState({
    brc: false,
    can_trace: false,
    fpa_safe: false,
    federally_inspected: false,
    gap: false,
    gmp: false,
    gfcp: false,
    global_gap: false,
    haccp: false,
    iso: false,
    ppm150: false,
    provincially_inspected: false,
    sqf: false,
    sqf_1000: false,
    sqf_2000: false,
    vqa: false,
    beer_tbd: false,
    cider_tbd: false,
    distillery_tbd: false,
    none: false,
  });

  /*
    const offeredFoodSafetyTraceabilityStandardsInputs = {
        Component: FormCheckboxesGroup,
        label: 'Please indicate which food safety & traceability standards you offer:',
        id: 'offeredFoodSafetyTraceabilityStandardsCheckboxes',
        checkboxes: [
            {
                label: 'BRC',
                value: 'brc'
            },
            {
                label: 'Can-Trace',
                value: 'can_trace'
            },
            {
                label: 'FPA-SAFE',
                value: 'fpa_safe'
            },
            {
                label: 'Federally Inspected',
                value: 'federally_inspected'
            },
            {
                label: 'G.A.P.',
                value: 'gap'
            },
            {
                label: 'GFCP',
                value: 'gfcp'
            },
            {
                label: 'GMP',
                value: 'gmp'
            },
            {
                label: 'Global G.A.P',
                value: 'global_gap'
            },
            {
                label: 'HACCP',
                value: 'haccp'
            },
            {
                label: 'ISO',
                value: 'iso'
            },
            {
                label: 'PPM150',
                value: 'ppm150'
            },
            {
                label: 'Provincially Inspected',
                value: 'provincially_inspected'
            },
            {
                label: 'SQF',
                value: 'sqf'
            },
            {
                label: 'SQF 1000',
                value: 'sqf_1000'
            },
            {
                label: 'SQF 2000',
                value: 'sqf_2000'
            },
            /*
            {
                label: 'VQA',
                value: 'vqa'
            },
            {
                label: 'BEER (TBD)',
                value: 'beer_tbd'
            },
            {
                label: 'CIDER (TBD)',
                value: 'cider_tbd'
            },
            {
                label: 'DISTILLERY (TBD)',
                value: 'distillery_tbd'
            },
            /
            {
                label: 'None',
                value: 'none'
            },
        ],
        selectedCheckboxes: selectedOfferedFoodSafetyTraceabilityStandards,
        setCheckboxStates: setSelectedOfferedFoodSafetyTraceabilityStandards,
        createUniqueIds: 'foodSafetyTraceabilityStandardsFormOffered'
    }
    */

  /*
    const requiredFoodSafetyTraceabilityStandardsInputs = {
        Component: FormCheckboxesGroup,
        label: 'Please indicate which food safety & traceability standards you require from suppliers:',
        id: 'requiredFoodSafetyTraceabilityStandardsCheckboxes',
        checkboxes: [
            {
                label: 'BRC',
                value: 'brc'
            },
            {
                label: 'Can-Trace',
                value: 'can_trace'
            },
            {
                label: 'FPA-SAFE',
                value: 'fpa_safe'
            },
            {
                label: 'Federally Inspected',
                value: 'federally_inspected'
            },
            {
                label: 'G.A.P.',
                value: 'gap'
            },
            {
                label: 'GFCP',
                value: 'gfcp'
            },
            {
                label: 'GMP',
                value: 'gmp'
            },
            {
                label: 'Global G.A.P',
                value: 'global_gap'
            },
            {
                label: 'HACCP',
                value: 'haccp'
            },
            {
                label: 'ISO',
                value: 'iso'
            },
            {
                label: 'PPM150',
                value: 'ppm150'
            },
            {
                label: 'Provincially Inspected',
                value: 'provincially_inspected'
            },
            {
                label: 'SQF',
                value: 'sqf'
            },
            {
                label: 'SQF 1000',
                value: 'sqf_1000'
            },
            {
                label: 'SQF 2000',
                value: 'sqf_2000'
            },
            /*
            {
                label: 'VQA',
                value: 'vqa'
            },
            {
                label: 'BEER (TBD)',
                value: 'beer_tbd'
            },
            {
                label: 'CIDER (TBD)',
                value: 'cider_tbd'
            },
            {
                label: 'DISTILLERY (TBD)',
                value: 'distillery_tbd'
            },
            /
            {
                label: 'None',
                value: 'none'
            },
        ],
        selectedCheckboxes: selectedRequiredFoodSafetyTraceabilityStandards,
        setCheckboxStates: setSelectedRequiredFoodSafetyTraceabilityStandards,
        createUniqueIds: 'foodSafetyTraceabilityStandardsFormRequired'
    }
    */

  const requiredSellerFoodSafetyTraceabilityStandardsInputs = {
    Component: FormCheckboxesGroup,
    label:
      "As a Seller, select all of the Food Safety and Traceability Standards that you are certified to meet:",
    id: "sellerRequiredFoodSafetyTraceabilityStandardsCheckboxes",
    checkboxes: [
      {
        label: "BRC",
        value: "brc",
      },
      {
        label: "Can-Trace",
        value: "can_trace",
      },
      {
        label: "FPA-SAFE",
        value: "fpa_safe",
      },
      {
        label: "Federally Inspected",
        value: "federally_inspected",
      },
      {
        label: "G.A.P.",
        value: "gap",
      },
      {
        label: "GFCP",
        value: "gfcp",
      },
      {
        label: "GMP",
        value: "gmp",
      },
      {
        label: "Global G.A.P",
        value: "global_gap",
      },
      {
        label: "HACCP",
        value: "haccp",
      },
      {
        label: "ISO",
        value: "iso",
      },
      {
        label: "PPM150",
        value: "ppm150",
      },
      {
        label: "Provincially Inspected",
        value: "provincially_inspected",
      },
      {
        label: "SQF",
        value: "sqf",
      },
      {
        label: "SQF 1000",
        value: "sqf_1000",
      },
      {
        label: "SQF 2000",
        value: "sqf_2000",
      },
      /*
            {
                label: 'VQA',
                value: 'vqa'
            },
            {
                label: 'BEER (TBD)',
                value: 'beer_tbd'
            },
            {
                label: 'CIDER (TBD)',
                value: 'cider_tbd'
            },
            {
                label: 'DISTILLERY (TBD)',
                value: 'distillery_tbd'
            },
            */
      {
        label: "None",
        value: "none",
      },
    ],
    selectedCheckboxes: selectedSellerRequiredFoodSafetyTraceabilityStandards,
    setCheckboxStates: setSelectedSellerRequiredFoodSafetyTraceabilityStandards,
    createUniqueIds: "foodSafetyTraceabilityStandardsFormSellerRequired",
  };

  const requiredBuyerFoodSafetyTraceabilityStandardsInputs = {
    Component: FormCheckboxesGroup,
    label:
      "As a Buyer, select all of the Food Safety and Traceability Standards that you require from suppliers:",
    id: "buyerRequiredFoodSafetyTraceabilityStandardsCheckboxes",
    checkboxes: [
      {
        label: "BRC",
        value: "brc",
      },
      {
        label: "Can-Trace",
        value: "can_trace",
      },
      {
        label: "FPA-SAFE",
        value: "fpa_safe",
      },
      {
        label: "Federally Inspected",
        value: "federally_inspected",
      },
      {
        label: "G.A.P.",
        value: "gap",
      },
      {
        label: "GFCP",
        value: "gfcp",
      },
      {
        label: "GMP",
        value: "gmp",
      },
      {
        label: "Global G.A.P",
        value: "global_gap",
      },
      {
        label: "HACCP",
        value: "haccp",
      },
      {
        label: "ISO",
        value: "iso",
      },
      {
        label: "PPM150",
        value: "ppm150",
      },
      {
        label: "Provincially Inspected",
        value: "provincially_inspected",
      },
      {
        label: "SQF",
        value: "sqf",
      },
      {
        label: "SQF 1000",
        value: "sqf_1000",
      },
      {
        label: "SQF 2000",
        value: "sqf_2000",
      },
      /*
            {
                label: 'VQA',
                value: 'vqa'
            },
            {
                label: 'BEER (TBD)',
                value: 'beer_tbd'
            },
            {
                label: 'CIDER (TBD)',
                value: 'cider_tbd'
            },
            {
                label: 'DISTILLERY (TBD)',
                value: 'distillery_tbd'
            },
            */
      {
        label: "None",
        value: "none",
      },
    ],
    selectedCheckboxes: selectedBuyerRequiredFoodSafetyTraceabilityStandards,
    setCheckboxStates: setSelectedBuyerRequiredFoodSafetyTraceabilityStandards,
    createUniqueIds: "foodSafetyTraceabilityStandardsBuyerFormRequired",
  };

  const requiredProcessorFoodSafetyTraceabilityStandardsInputs = {
    Component: FormCheckboxesGroup,
    label:
      "As a Processor, select all of the Food Safety and Traceability Standards that you require from suppliers:",
    id: "processorRequiredFoodSafetyTraceabilityStandardsCheckboxes",
    checkboxes: [
      {
        label: "BRC",
        value: "brc",
      },
      {
        label: "Can-Trace",
        value: "can_trace",
      },
      {
        label: "FPA-SAFE",
        value: "fpa_safe",
      },
      {
        label: "Federally Inspected",
        value: "federally_inspected",
      },
      {
        label: "G.A.P.",
        value: "gap",
      },
      {
        label: "GFCP",
        value: "gfcp",
      },
      {
        label: "GMP",
        value: "gmp",
      },
      {
        label: "Global G.A.P",
        value: "global_gap",
      },
      {
        label: "HACCP",
        value: "haccp",
      },
      {
        label: "ISO",
        value: "iso",
      },
      {
        label: "PPM150",
        value: "ppm150",
      },
      {
        label: "Provincially Inspected",
        value: "provincially_inspected",
      },
      {
        label: "SQF",
        value: "sqf",
      },
      {
        label: "SQF 1000",
        value: "sqf_1000",
      },
      {
        label: "SQF 2000",
        value: "sqf_2000",
      },
      /*
            {
                label: 'VQA',
                value: 'vqa'
            },
            {
                label: 'BEER (TBD)',
                value: 'beer_tbd'
            },
            {
                label: 'CIDER (TBD)',
                value: 'cider_tbd'
            },
            {
                label: 'DISTILLERY (TBD)',
                value: 'distillery_tbd'
            },
            */
      {
        label: "None",
        value: "none",
      },
    ],
    selectedCheckboxes:
      selectedProcessorRequiredFoodSafetyTraceabilityStandards,
    setCheckboxStates:
      setSelectedProcessorRequiredFoodSafetyTraceabilityStandards,
    createUniqueIds: "foodSafetyTraceabilityStandardsProcessorFormRequired",
  };

  const foodSafetyTraceabilityStandardsFormInputs = [];
  /*
    usersProfiles.some(up => {
        if (up === 'seller' || up === 'processor' || up === 'service_provider')
            foodSafetyTraceabilityStandardsFormInputs.push(offeredFoodSafetyTraceabilityStandardsInputs)
        return (up === 'seller' || up === 'processor' || up === 'service_provider')
    })
    */
  /*
    usersProfiles.some(up => {
        if (up === 'buyer' || up === 'processor' || up === 'service_provider')
            foodSafetyTraceabilityStandardsFormInputs.push(requiredFoodSafetyTraceabilityStandardsInputs)
        return (up === 'buyer' || up === 'processor' || up === 'service_provider')
    })
    */
  if (isSeller)
    foodSafetyTraceabilityStandardsFormInputs.push(
      requiredSellerFoodSafetyTraceabilityStandardsInputs
    );
  if (isBuyer)
    foodSafetyTraceabilityStandardsFormInputs.push(
      requiredBuyerFoodSafetyTraceabilityStandardsInputs
    );
  if (isProcessor)
    foodSafetyTraceabilityStandardsFormInputs.push(
      requiredProcessorFoodSafetyTraceabilityStandardsInputs
    );
  /*
   useState() hook to display the Buyer Specific Details form’s validation confirmation message when the form is being/has been submitted.
   */
  const [
    foodSafetyTraceabilityStandardsFormValidated,
    setFoodSafetyTraceabilityStandardsFormValidated,
  ] = useState("");

  const [
    selectedProcessingMethodsAvailable,
    setSelectedProcessingMethodsAvailable,
  ] = useState({
    abattoir_services: false,
    baking: false,
    brewing: false,
    canning: false,
    cheese_making: false,
    chopping_dicing_slicing: false,
    cooking: false,
    curing: false,
    distilling: false,
    drying: false,
    freezing: false,
    further_meat_processing: false,
    juicing_pressing: false,
    milling: false,
    other: false,
    other_dairy_processing: false,
    packing: false,
    peeling: false,
    pureeing: false,
    smoking: false,
    wine_making: false,
  });
  const [
    selectedBusinessClassificationsForProductsYouProcess,
    setSelectedBusinessClassificationsForProductsYouProcess,
  ] = useState({
    appropriate_for_allergies_special_diets: false,
    certified_organic: false,
    halal: false,
    kosher: false,
    specialty: false,
  });
  const [
    selectedGeneralProcessingFormats,
    setSelectedGeneralProcessingFormats,
  ] = useState({
    further_processing: false,
    large_scale_food_service: false,
    restaurants_or_food_service: false,
    retail: false,
  });
  const [processingVolumes, setProcessingVolumes] = useState({
    small: false,
    medium: false,
    large: false,
  });
  const [coPackingServices, setCoPackingServices] = useState({
    yes: false,
    no: false,
    negotiable: false,
  });
  const [privateLabelServices, setPrivateLabelServices] = useState({
    yes: false,
    no: false,
    negotiable: false,
  });
  const [customProcessTakeSpecialOrders, setCustomProcessTakeSpecialOrders] =
    useState({
      yes: false,
      no: false,
      negotiable: false,
    });
  const [thirdPartyLiabilityInsurance, setThirdPartyLiabilityInsurance] =
    useState({
      yes: false,
      no: false,
    });
  const [
    processorSpecificDetailsFormErrorMessages,
    setProcessorSpecificDetailsFormErrorMessages,
  ] = useState({
    // processingVolumesCheckboxes: null,
    coPackingServicesCheckboxes: null,
    privateLabelServicesCheckboxes: null,
    customProcessTakeSpecialOrdersCheckboxes: null,
    thirdPartyLiabilityInsuranceCheckboxes: null,
    messageList: [],
  });
  const [
    processorSpecificDetailsFormValidationMessage,
    setProcessorSpecificDetailsFormValidationMessage,
  ] = useState("");

  const determineLocationPrefix = () => {
    const locationObj = window.location;
    /*
        console.log('%c locationObj:', 'color: Chartreuse; font-weight: bold;')
        console.log({ locationObj })
        */
    const host = locationObj.host;
    // const host = 'localhost:3000'
    // const host = 'b2b.staging2.ontariofresh.ca'
    // const host = 'b2b.ontariofresh.ca'
    /*
        console.log('%c host:', 'color: Chartreuse; font-weight: bold;')
        console.log({ host })
        */
    const hasPort = host.split(":")[1];
    /*
        console.log('%c hasPort:', 'color: Chartreuse; font-weight: bold;')
        console.log({ hasPort })
        */
    if (hasPort) return "staging2";
    const isStaging = host.split(".").find((str) => str === "staging2");
    /*
        console.log('%c isStaging:', 'color: Chartreuse; font-weight: bold;')
        console.log({ isStaging })
        */
    if (isStaging) return "staging2";
    return "www";
  };

  useEffect(() => {
    // ***** From <Profile /> UNSAFE_componentWillMount() begin:
    // console.log('%c User’s profile information is requested when Profile mounts here in UNSAFE_componentWillMount:', 'font-style: italic;')
    getProfile();
    // console.log('%c <ProfileHub /> useEffect() getProfile():', 'color: turquoise; font-weight: bold;')

    if (props.client && props.client.token) {
      props.userMessagesRequest(props.client); //for the blocked status
      // console.log('%c <ProfileHub /> useEffect() Requesting user’s messages', 'color: red; font-weight: bold;')
    }

    // document.body.style.backgroundColor = "#F5F4F5"
    // ***** <Profile /> UNSAFE_componentWillMount() end.

    // setUsersProfiles([ ...usersPreviousProfiles ])
  }, []);

  // From <Profile /> componentDidUpdate:
  /*
    useEffect(() => {
        getProfile()
        console.log('%c <ProfileHub /> useEffect([ props.params.slug ]) getProfile():', 'color: red; font-weight: bold;')
    }, [ props.params.slug ])
    */

  useEffect(() => {
    if (profile.current.id) {
      console.log(
        "%c WE NOW HAVE THE USER’S FULL PROFILE! Start unpacking...",
        "color: blue; font-weight: bold;"
      );
      console.log({ profile_current: profile.current });
      const user = profile.current;

      console.log("%c user:", "color: GoldenRod; font-weight: bold;");
      console.log({ user });

      /*
                NOTE: The user’s profiles are located in profile.current.roles.
            */
      setLocationPrefix(determineLocationPrefix());
      setSlug(user.slug);
      const usersCurrentProfiles = user.roles.map((role) => role.value);
      const usersCurrentProfilesNoOrganization = usersCurrentProfiles.filter(
        (profile) => profile !== "organization"
      );

      console.log(
        "%c usersCurrentProfilesNoOrganization:",
        "color: teal; font-weight: bold;"
      );
      console.log({ usersCurrentProfilesNoOrganization });

      const usersCurrentProfilesShuffled = shuffleCurrentProfiles(
        usersCurrentProfilesNoOrganization
      );
      /*
            console.log('%c usersCurrentProfilesShuffled:', 'color: red; font-weight: bold;')
            console.log({ usersCurrentProfilesShuffled })
            */
      // General Business Information inputs:
      setUsersProfiles([...usersCurrentProfilesShuffled]);

      const profile_current_id = profile.current.id;
      let buyer_role_id = "";
      let buyer_classification_id = "";
      let buyer_payment_methods_id = "";
      let buyer_safety_standards_id = "";
      let seller_role_id = "";
      let seller_classification_id = "";
      let seller_payment_methods_id = "";
      let seller_safety_standards_id = "";
      let vendor_role_id = "";
      let vendor_highlight_id = "";
      let vendor_classification_id = "";
      let processor_role_id = "";
      let processor_classification_id = "";
      let processor_processing_types_id;
      let processor_market_types_id = "";
      let processor_safety_standards_id = "";
      let serviceProvider_services_needed_id = "";
      let serviceProvider_services_provided_id = "";

      const buyerObj = user.roles.find((role) => role.value === "buyer");
      /*
            console.log('%c buyerObj:', 'color: red; font-weight: bold;')
            console.log({ buyerObj })
            */
      if (buyerObj) {
        buyer_role_id = buyerObj.id ? buyerObj.id : "";
        buyer_classification_id = buyerObj.data.classifications.id
          ? buyerObj.data.classifications.id
          : "";
        buyer_payment_methods_id = buyerObj.data.payment_methods.id
          ? buyerObj.data.payment_methods.id
          : "";
        buyer_safety_standards_id = buyerObj.data.safety_standards.id
          ? buyerObj.data.safety_standards.id
          : "";
      }

      const sellerObj = user.roles.find((role) => role.value === "seller");
      /*
            console.log('%c sellerObj:', 'color: red; font-weight: bold;')
            console.log({ sellerObj })
            */
      if (sellerObj) {
        seller_role_id = sellerObj.id ? sellerObj.id : "";
        seller_classification_id = sellerObj.data.classifications.id
          ? sellerObj.data.classifications.id
          : "";
        seller_payment_methods_id = sellerObj.data.payment_methods.id
          ? sellerObj.data.payment_methods.id
          : "";
        seller_safety_standards_id = sellerObj.data.safety_standards.id
          ? sellerObj.data.safety_standards.id
          : "";
      }

      const vendorObj = user.roles.find((role) => role.value === "vendor");
      /*
            console.log('%c vendorObj:', 'color: turquoise; font-weight: bold;')
            console.log({ vendorObj })
            */
      if (vendorObj) {
        vendor_role_id = vendorObj.id ? vendorObj.id : "";
        vendor_highlight_id = vendorObj.data.highlights.id
          ? vendorObj.data.highlights.id
          : "";
        vendor_classification_id = vendorObj.data.classifications.id
          ? vendorObj.data.classifications.id
          : "";
      }

      const processorObj = user.roles.find(
        (role) => role.value === "processor"
      );
      /*
            console.log('%c processorObj:', 'color: red; font-weight: bold;')
            console.log({ processorObj })
            */
      if (processorObj) {
        processor_role_id = processorObj.id ? processorObj.id : "";
        processor_classification_id = processorObj.data.classifications.id
          ? processorObj.data.classifications.id
          : "";
        processor_processing_types_id = processorObj.data.processing_types.id
          ? processorObj.data.processing_types.id
          : "";
        processor_market_types_id = processorObj.data.market_types.id
          ? processorObj.data.market_types.id
          : "";
        processor_safety_standards_id = processorObj.data.safety_standards.id
          ? processorObj.data.safety_standards.id
          : "";
      }

      const serviceProviderObj = user.roles.find(
        (role) => role.value === "service_provider"
      );

      if (serviceProviderObj) {
        serviceProvider_services_needed_id = serviceProviderObj.data
          .services_needed.id
          ? serviceProviderObj.data.services_needed.id
          : "";
        serviceProvider_services_provided_id = serviceProviderObj.data
          .services_provided.id
          ? serviceProviderObj.data.services_provided.id
          : "";
      }

      setIds({
        profile_current_id,
        buyer_role_id,
        buyer_classification_id,
        buyer_payment_methods_id,
        buyer_safety_standards_id,
        seller_role_id,
        seller_classification_id,
        seller_payment_methods_id,
        seller_safety_standards_id,
        vendor_role_id,
        vendor_highlight_id,
        vendor_classification_id,
        processor_role_id,
        processor_classification_id,
        processor_processing_types_id,
        processor_market_types_id,
        processor_safety_standards_id,
        serviceProvider_services_needed_id,
        serviceProvider_services_provided_id,
      });

      setInputBusinessName(user.business_name);
      setInputFirstName(user.first_name);
      setInputLastName(user.last_name);
      setInputTitle(user.title);
      setInputOntarioAddress(user.address_1 || "");
      setInputCityTown(user.city || "");
      setInputPostalCode(user.postal_code || "");
      setCheckboxGreenbeltRegion({
        greenbeltRegion: user.greenbelt_location || false,
      });
      setInputEmail(user.email);
      setInputFax(user.fax || "");
      setInputPhone(user.phone || "");
      setCheckboxHidePersonalInfo({
        hidePersonalInfo: user.hide_personal_info || false,
      });
      setInputBusinessDescription(user.description || "");
      if (vendorObj) {
        setInputVendorSpecificDirections(
          vendorObj.data.highlights.specific_directions
        );
        setSelectedVendorSeasons({
          is_open_spring: vendorObj.data.highlights.is_open_spring,
          is_open_summer: vendorObj.data.highlights.is_open_summer,
          is_open_fall: vendorObj.data.highlights.is_open_fall,
          is_open_winter: vendorObj.data.highlights.is_open_winter,
          is_open_year_round: vendorObj.data.highlights.open_year_round,
        });
        setInputVendorFurtherDetails(
          vendorObj.data.highlights.business_hour_details
        );
      }
      // Location Details:
      if (user.addresses.length > 0) {
        const userAddresses = user.addresses.map((adr, i) => {
          const {
            id,
            description,
            address_1,
            address_2,
            city,
            province,
            postal_code,
            country,
            phone,
          } = adr;
          const address = {
            id,
            description,
            address_1,
            address_2,
            city,
            province,
            postal_code,
            country,
            phone,
          };
          return address;
        });
        setLocationsBusinessHours([...userAddresses]);
      } else {
        setLocationsBusinessHours([LOCATIONS_BUSINESS_HOURS_DEFAULT]);
      }
      // Website and Social Media inputs:
      setInputOnlineStore(user.online_store || "");
      setInputWebsite(user.website || "");
      setInputFacebook(user.facebook || "");
      setInputInstagram(user.instagram || "");
      setInputTwitter(user.twitter || "");
      setInputYouTube(user.youtube || "");
      setInputLinkedIn(user.linkedin || "");
      // Profile Picture inputs:
      setCompanyLogoPhoto(user.photo_file_name);
      // Vendor Profile Highlights
      if (vendorObj) {
        setSelectedVendorIcons({
          online_store: vendorObj.data.highlights.online_store,
          delivery: vendorObj.data.highlights.delivery,
          organic: vendorObj.data.highlights.organic,
          halal: vendorObj.data.highlights.halal,
          kosher: vendorObj.data.highlights.kosher,
          // open_year_round: vendorObj.data.highlights.open_year_round,
          open_seasonaly: vendorObj.data.highlights.open_seasonally,
          fruits_vegetables: vendorObj.data.highlights.fruits_vegetables,
          meat: vendorObj.data.highlights.meat,
          fish: vendorObj.data.highlights.fish,
          dairy_eggs: vendorObj.data.highlights.dairy_eggs,
          nuts_seeds_herbs: vendorObj.data.highlights.nuts_seeds_herbs,
          prepared_food: vendorObj.data.highlights.prepared_food,
          alcoholic_beverages: vendorObj.data.highlights.alcoholic_beverages,
          non_alcoholic_beverages:
            vendorObj.data.highlights.non_alcoholic_beverages,
          grains: vendorObj.data.highlights.grains,
        });
        setSelectedProfileMasthead(vendorObj.data.highlights.masthead);
        setSelectedBusinessClassifications({
          sp_appropriate_for_allergies_special_diets:
            vendorObj.data.classifications.appropriateforallergiesspecialdiets,
          sp_certified_organic: vendorObj.data.classifications.certifiedorganic,
          sp_halal: vendorObj.data.classifications.halal,
          sp_kosher: vendorObj.data.classifications.kosher,
          sp_specialty: vendorObj.data.classifications.artisanspecialty,
        });
      }
      // Delivery Details inputs:
      /*
                ALERT: Don’t think the profile.current.roles objects contain any data for this option yet. Going to need to structure this data for:
                
                • sellers
                • buyers
                • processors
            */
      if (vendorObj) {
        setSelectedDeliveryDetailsVendorOfferDelivery(
          `${vendorObj.data.role_details.delivery}`
        );
        setInputDeliveryDetailsVendorFurtherDetails(
          vendorObj.data.highlights.delivery_details
        );
      }
      if (sellerObj)
        setSelectedDeliveryDetailsSellerOfferDelivery(
          `${sellerObj.data.role_details.delivery}`
        );
      if (processorObj)
        setSelectedDeliveryDetailsProcessorOfferDelivery(
          `${processorObj.data.role_details.delivery}`
        );
      if (buyerObj)
        setSelectedDeliveryDetailsBuyerOfferDelivery(
          `${buyerObj.data.role_details.delivery}`
        );
      // Photo Gallery inputs:
      const userMediaPhotos = user.media.photos.map((photo, i) => {
        const { id, photo_file_name } = photo;
        const photoGalleryObject = { id, src: photo_file_name };
        return photoGalleryObject;
      });
      setPhotoGalleryAttachments([...userMediaPhotos]);

      const currentProducts = [...PRODUCT_CATEGORIES];

      if (buyerObj) {
        const currentBuyerProducts = buyerObj.data.products;
        currentBuyerProducts.forEach((product, i) => {
          currentProducts.forEach((category, j) => {
            if (product.category === category.id) {
              category.products.buyer = [
                ...category.products.buyer,
                {
                  id: product.id,
                  name: product.name,
                },
              ];
            }
          });
        });
      }

      if (sellerObj) {
        const currentSellerProducts = sellerObj.data.products;
        currentSellerProducts.forEach((product, i) => {
          currentProducts.forEach((category, j) => {
            if (product.category === category.id) {
              category.products.seller = [
                ...category.products.seller,
                {
                  id: product.id,
                  name: product.name,
                },
              ];
            }
          });
        });
      }

      if (vendorObj) {
        const currentVendorProducts = vendorObj.data.products;
        currentVendorProducts.forEach((product, i) => {
          currentProducts.forEach((category, j) => {
            if (product.category === category.id) {
              category.products.vendor.push({
                id: product.id,
                name: product.name,
              });
            }
          });
        });
      }

      if (processorObj) {
        const currentProcessorProducts = processorObj.data.products;
        currentProcessorProducts.forEach((product, i) => {
          currentProducts.forEach((category, j) => {
            if (product.category === category.id) {
              category.products.processor = [
                ...category.products.processor,
                {
                  id: product.id,
                  name: product.name,
                },
              ];
            }
          });
        });
      }

      setProducts([...currentProducts]);

      //  Business Type inputs:
      const businessTypes = {};
      user.category.forEach((cat, i) => {
        if (cat === "Aggregator or Hub") businessTypes.aggregator_or_hub = true;
        if (cat === "Agricultural Association")
          businessTypes.agricultural_assoc = true;
        if (cat === "Agritourism") businessTypes.agritourism = true;
        if (cat === "Bakery") businessTypes.bakery = true;
        if (cat === "Brewery") businessTypes.brewery = true;
        if (cat === "Buyer") businessTypes.buyer = true;
        if (cat === "Chef") businessTypes.chef = true;
        if (cat === "Cidery") businessTypes.cidery = true;
        if (cat === "Co-op") businessTypes.co_op = true;
        if (cat === "Community Supported Agriculture")
          businessTypes.community_agriculture = true;
        if (cat === "Custom Processor") businessTypes.custom_processor = true;
        if (cat === "Distillery") businessTypes.distillery = true;
        if (cat === "Distributor") businessTypes.distributor = true;
        if (cat === "Equipment & Machinery Sales")
          businessTypes.equip_machinery_sales = true;
        if (cat === "Farmers' Market") businessTypes.farmers_market = true;
        if (cat === "Food Bank") businessTypes.food_bank = true;
        if (cat === "Foodservice Provider")
          businessTypes.food_service_provider = true;
        if (cat === "Government") businessTypes.government = true;
        if (cat === "Greenhouse") businessTypes.greenhouse = true;
        if (cat === "Grocery Store") businessTypes.grocery_store = true;
        if (cat === "Group Purchasing Organization")
          businessTypes.group_purchasing = true;
        if (cat === "Grower/Producer") businessTypes.grower_producer = true;
        if (cat === "Input Provider") businessTypes.input_provider = true;
        if (cat === "Institution") businessTypes.institution = true;
        if (cat === "Logistics") businessTypes.logistics = true;
        if (cat === "Marketing and Advertising")
          businessTypes.marketing_advertising = true;
        if (cat === "Nursery") businessTypes.nursery = true;
        if (cat === "On-Farm Market") businessTypes.on_farm_market = true;
        if (cat === "Other Agricultural Supporter")
          businessTypes.other_agriculture = true;
        if (cat === "Other Support Industry")
          businessTypes.other_support_industry = true;
        if (cat === "Packaging, Shipping etc.")
          businessTypes.packaging_shipping = true;
        if (cat === "Packer") businessTypes.packer = true;
        if (cat === "Pick-your-own") businessTypes.pick_your_own = true;
        if (cat === "Processor") businessTypes.processor = true;
        if (cat === "Regional Food Network")
          businessTypes.regional_food_network = true;
        if (cat === "Restaurant") businessTypes.restaurant = true;
        if (cat === "Retail Operator")
          businessTypes.retail_operator_shop = true;
        if (cat === "School or Cafeteria")
          businessTypes.school_or_cafeteria = true;
        if (cat === "School Supplier/Vendor")
          businessTypes.school_supplier_vendor = true;
        if (cat === "Seller") businessTypes.seller = true;
        if (cat === "Transportation and Climate Control")
          businessTypes.transportation_climate_control = true;
        if (cat === "Wholesale") businessTypes.wholesale = true;
        if (cat === "Winery") businessTypes.winery = true;
      });
      setSelectedBusinessCategories({
        ...selectedBusinessCaterories,
        ...businessTypes,
      });
      // Additional Seller Details inputs:
      if (sellerObj) {
        setSelectedSellerBusinessClassifications({
          appropriate_for_allergies_special_diets:
            sellerObj.data.classifications.appropriateforallergiesspecialdiets,
          certified_organic: sellerObj.data.classifications.certifiedorganic,
          halal: sellerObj.data.classifications.halal,
          kosher: sellerObj.data.classifications.kosher,
          specialty: sellerObj.data.classifications.artisanspecialty,
        });
        setSelectedSellerPreferredPaymentMethods({
          visa_debit: sellerObj.data.payment_methods.creditdebit,
          cod: sellerObj.data.payment_methods.cashondelivery,
          invoice_po: sellerObj.data.payment_methods.purchaseorderinvoice,
        });
        const sellerBusinessScale = {
          small: false,
          medium: false,
          large: false,
        };
        sellerObj.data.role_details.business_scale.forEach((bs, i) => {
          if (bs === "Sma") sellerBusinessScale.small = true;
          if (bs === "Med") sellerBusinessScale.medium = true;
          if (bs === "Lar") sellerBusinessScale.large = true;
        });
        setSelectedSellerBusinessSize({ ...sellerBusinessScale });
        setSelectedSellerThirdPartyInsurance({
          yes: sellerObj.data.role_details.third_party_insurance,
          no: !sellerObj.data.role_details.third_party_insurance,
        });
      }
      // Additional Buyer Details inputs:
      if (buyerObj) {
        setSelectedBuyerBusinessClassifications({
          appropriate_for_allergies_special_diets:
            buyerObj.data.classifications.appropriateforallergiesspecialdiets,
          certified_organic: buyerObj.data.classifications.certifiedorganic,
          halal: buyerObj.data.classifications.halal,
          kosher: buyerObj.data.classifications.kosher,
          specialty: buyerObj.data.classifications.artisanspecialty,
        });
        setSelectedBuyerPreferredPaymentMethods({
          visa_debit: buyerObj.data.payment_methods.creditdebit,
          cod: buyerObj.data.payment_methods.cashondelivery,
          invoice_po: buyerObj.data.payment_methods.purchaseorderinvoice,
        });
        const buyerBusinessScale = {
          small: false,
          medium: false,
          large: false,
        };
        buyerObj.data.role_details.business_scale.forEach((bs, i) => {
          if (bs === "Sma") buyerBusinessScale.small = true;
          if (bs === "Med") buyerBusinessScale.medium = true;
          if (bs === "Lar") buyerBusinessScale.large = true;
        });
        setSelectedBuyerBusinessSize({ ...buyerBusinessScale });
        setSelectedBuyerThirdPartyInsurance({
          yes: buyerObj.data.role_details.third_party_insurance,
          no: !buyerObj.data.role_details.third_party_insurance,
        });
      }
      // Additional Processor Details inputs:
      if (processorObj) {
        setSelectedProcessingMethodsAvailable({
          abattoir_services: processorObj.data.processing_types.abattoirservics,
          baking: processorObj.data.processing_types.baking,
          brewing: processorObj.data.processing_types.brewing,
          canning: processorObj.data.processing_types.canning,
          cheese_making: processorObj.data.processing_types.cheesemaking,
          chopping_dicing_slicing:
            processorObj.data.processing_types.choppingdicingslicing,
          cooking: processorObj.data.processing_types.cooking,
          curing: processorObj.data.processing_types.curing,
          distilling: processorObj.data.processing_types.distilling,
          drying: processorObj.data.processing_types.drying,
          freezing: processorObj.data.processing_types.freezing,
          further_meat_processing:
            processorObj.data.processing_types.furthermeatprocessing,
          juicing_pressing: processorObj.data.processing_types.juicingpressing,
          milling: processorObj.data.processing_types.milling,
          other: processorObj.data.processing_types.other,
          other_dairy_processing:
            processorObj.data.processing_types.otherdairyprocessing,
          packing: processorObj.data.processing_types.packing,
          peeling: processorObj.data.processing_types.peeling,
          pureeing: processorObj.data.processing_types.pureeing,
          smoking: processorObj.data.processing_types.smoking,
          wine_making: processorObj.data.processing_types.winemaking,
        });
        setSelectedBusinessClassificationsForProductsYouProcess({
          appropriate_for_allergies_special_diets:
            processorObj.data.classifications
              .appropriateforallergiesspecialdiets,
          certified_organic: processorObj.data.classifications.certifiedorganic,
          halal: processorObj.data.classifications.halal,
          kosher: processorObj.data.classifications.kosher,
          specialty: processorObj.data.classifications.artisanspecialty,
        });
        setSelectedGeneralProcessingFormats({
          further_processing: processorObj.data.market_types.furtherprocessing,
          large_scale_food_service:
            processorObj.data.market_types.largescalefoodservice,
          restaurants_or_food_service:
            processorObj.data.market_types.restaurantsorfoodservice,
          retail: processorObj.data.market_types.retail,
        });
        const processingVolumes = {
          small: false,
          medium: false,
          large: false,
        };
        processorObj.data.role_details.business_scale.forEach((bs, i) => {
          if (bs === "Sma") processingVolumes.small = true;
          if (bs === "Med") processingVolumes.medium = true;
          if (bs === "Lar") processingVolumes.large = true;
        });
        setProcessingVolumes({ ...processingVolumes });
        setCoPackingServices({
          yes: processorObj.data.role_details.co_packing === 1,
          no: processorObj.data.role_details.co_packing === 2,
          negotiable: processorObj.data.role_details.co_packing === 3,
        });
        setPrivateLabelServices({
          yes: processorObj.data.role_details.private_label === 1,
          no: processorObj.data.role_details.private_label === 2,
          negotiable: processorObj.data.role_details.private_label === 3,
        });
        setCustomProcessTakeSpecialOrders({
          yes: processorObj.data.role_details.custom_process === 1,
          no: processorObj.data.role_details.custom_process === 2,
          negotiable: processorObj.data.role_details.custom_process === 3,
        });
        setThirdPartyLiabilityInsurance({
          yes: processorObj.data.role_details.third_party_insurance,
          no: !processorObj.data.role_details.third_party_insurance,
        });
      }
      // Food Safety and Traceability Standards inputs:
      if (sellerObj) {
        setSelectedSellerRequiredFoodSafetyTraceabilityStandards({
          brc: sellerObj.data.safety_standards.brc,
          can_trace: sellerObj.data.safety_standards.cantrace,
          fpa_safe: sellerObj.data.safety_standards.fpasafe,
          federally_inspected:
            sellerObj.data.safety_standards.federallyinspected,
          gap: sellerObj.data.safety_standards.gap,
          gmp: sellerObj.data.safety_standards.gmp,
          gfcp: sellerObj.data.safety_standards.gfcp,
          global_gap: sellerObj.data.safety_standards.globalgap,
          haccp: sellerObj.data.safety_standards.haccp,
          iso: sellerObj.data.safety_standards.iso,
          ppm150: sellerObj.data.safety_standards.ppm150,
          provincially_inspected:
            sellerObj.data.safety_standards.provinciallyinspected,
          sqf: sellerObj.data.safety_standards.sqf,
          sqf_1000: sellerObj.data.safety_standards.sqf1000,
          sqf_2000: sellerObj.data.safety_standards.sqf2000,
          vqa: false,
          beer_tbd: false,
          cider_tbd: false,
          distillery_tbd: false,
          none: sellerObj.data.safety_standards.none,
        });
      }
      if (buyerObj) {
        setSelectedBuyerRequiredFoodSafetyTraceabilityStandards({
          brc: buyerObj.data.safety_standards.brc,
          can_trace: buyerObj.data.safety_standards.cantrace,
          fpa_safe: buyerObj.data.safety_standards.fpasafe,
          federally_inspected:
            buyerObj.data.safety_standards.federallyinspected,
          gap: buyerObj.data.safety_standards.gap,
          gmp: buyerObj.data.safety_standards.gmp,
          gfcp: buyerObj.data.safety_standards.gfcp,
          global_gap: buyerObj.data.safety_standards.globalgap,
          haccp: buyerObj.data.safety_standards.haccp,
          iso: buyerObj.data.safety_standards.iso,
          ppm150: buyerObj.data.safety_standards.ppm150,
          provincially_inspected:
            buyerObj.data.safety_standards.provinciallyinspected,
          sqf: buyerObj.data.safety_standards.sqf,
          sqf_1000: buyerObj.data.safety_standards.sqf1000,
          sqf_2000: buyerObj.data.safety_standards.sqf2000,
          vqa: false,
          beer_tbd: false,
          cider_tbd: false,
          distillery_tbd: false,
          none: buyerObj.data.safety_standards.none,
        });
      }
      if (processorObj) {
        setSelectedProcessorRequiredFoodSafetyTraceabilityStandards({
          brc: processorObj.data.safety_standards.brc,
          can_trace: processorObj.data.safety_standards.cantrace,
          fpa_safe: processorObj.data.safety_standards.fpasafe,
          federally_inspected:
            processorObj.data.safety_standards.federallyinspected,
          gap: processorObj.data.safety_standards.gap,
          gmp: processorObj.data.safety_standards.gmp,
          gfcp: processorObj.data.safety_standards.gfcp,
          global_gap: processorObj.data.safety_standards.globalgap,
          haccp: processorObj.data.safety_standards.haccp,
          iso: processorObj.data.safety_standards.iso,
          ppm150: processorObj.data.safety_standards.ppm150,
          provincially_inspected:
            processorObj.data.safety_standards.provinciallyinspected,
          sqf: processorObj.data.safety_standards.sqf,
          sqf_1000: processorObj.data.safety_standards.sqf1000,
          sqf_2000: processorObj.data.safety_standards.sqf2000,
          vqa: false,
          beer_tbd: false,
          cider_tbd: false,
          distillery_tbd: false,
          none: processorObj.data.safety_standards.none,
        });
      }
      // Services Offered and Wanted inputs:
      if (serviceProviderObj) {
        setSelectedServicesOffered({
          abattoir_services_meat:
            serviceProviderObj.data.services_provided.abattoirservics,
          advertising_marketing_promotions:
            serviceProviderObj.data.services_provided
              .advertisingmarketingpromotions,
          cold_storage_refrigerated_warehousing:
            serviceProviderObj.data.services_provided.coldstorage,
          consolidation_aggregation_hub_services:
            serviceProviderObj.data.services_provided
              .consolidationaggregationhub,
          delivery: serviceProviderObj.data.services_provided.delivery,
          frozen_storage:
            serviceProviderObj.data.services_provided.frozenstorage,
          full_serviced_distribution:
            serviceProviderObj.data.services_provided.fullservicedistribution,
          other_specialized_storage:
            serviceProviderObj.data.services_provided.otherspecializedstorage,
          post_harvest_handling_or_packing:
            serviceProviderObj.data.services_provided
              .postharvesthandlingpacking,
          processing: serviceProviderObj.data.services_provided.processing,
          sharing_purchase_orders:
            serviceProviderObj.data.services_provided.sharingpuchaceorders,
          transportation_and_climate_control:
            serviceProviderObj.data.services_provided
              .transportationclimatecontrol,
          warehousing: serviceProviderObj.data.services_provided.warehousing,
        });
        setSelectedServicesWanted({
          abattoir_services_meat:
            serviceProviderObj.data.services_needed.abattoirservics,
          advertising_marketing_promotions:
            serviceProviderObj.data.services_needed
              .advertisingmarketingpromotions,
          cold_storage_refrigerated_warehousing:
            serviceProviderObj.data.services_needed.coldstorage,
          consolidation_aggregation_hub_services:
            serviceProviderObj.data.services_needed.consolidationaggregationhub,
          delivery: serviceProviderObj.data.services_needed.delivery,
          frozen_storage: serviceProviderObj.data.services_needed.frozenstorage,
          full_serviced_distribution:
            serviceProviderObj.data.services_needed.fullservicedistribution,
          other_specialized_storage:
            serviceProviderObj.data.services_needed.otherspecializedstorage,
          post_harvest_handling_or_packing:
            serviceProviderObj.data.services_needed.postharvesthandlingpacking,
          processing: serviceProviderObj.data.services_needed.processing,
          sharing_purchase_orders:
            serviceProviderObj.data.services_needed.sharingpuchaceorders,
          transportation_and_climate_control:
            serviceProviderObj.data.services_needed
              .transportationclimatecontrol,
          warehousing: serviceProviderObj.data.services_needed.warehousing,
        });
      }

      /*
                NOTE: These options are located inside profile.current.roles[].data.category

                There are some new categories though:

                SELLER:

                Current:

                "Co-op"
                "Food Bank"
                "Grower/Producer"
                "Community Supported Agriculture"
                "Wholesale"
                "Greenhouse"
                "Aggregator or Hub"
                "Foodservice Provider"
                "Winery"
                "Brewery"
                "Bakery"
                "School Supplier/Vendor"
                "Seller"

                New: 

                "Agricultural Assoc."
                "Chef"
                "Distillery"
                "Government"
                "Input Provider"
                "On-farm Market"
                "Restaurant"
                "Transportation / Climate Control"

                BUYER:

                Current:

                "Co-op": false,
                "Buyer": false,
                "Food Bank": false,
                "Grocery Store": false,
                "Institution": false,
                "Chef": false,
                "Restaurant": false,
                "Retail Operator": false,
                "Nursery": false,
                "School or Cafeteria"

                New:

                "Aggregator or Hub"
                "Buyer"
                "Custom processor"
                "Food Service Provider"
                "Grower / Producer"
                "Nursery"
                "Regional Food Network"
                "Seller"

                PROCESSOR

                Current:

                "Processor"
                "Custom Processor"

                New:

                "Bakery"
                "Co-op"
                "Equip / Machinery Sales"
                "Grocery Store"
                "Logistics"
                "Packer"
                "School Supplier / Vendor"

                SERVICE_PROVIDER

                Current:

                "Distributor"
                "Packer"
                "Government"
                "Input Provider"
                "Packaging, Shipping etc."
                "Logistics"
                "Equipment & Machinery Sales"
                "Other Support Industry"
                "Other Agricultural Supporter"
                "Marketing and Advertising"
                "Transportation and Climate Control"

                New:

                "Brewery"
                "Community Agriculture"
                "Farmers’ Market"
                "Group Purchasing"
                "Marketing / Advertising"
                "Pick-your-own"
                "School or Cafeteria"

                VENDOR:

                New:

                "Agritourism"
                "Cidery"
                "Distributor"
                "Greenhouse"
                "Institution"
                "Other Agriculture"
                "Retail Operator / Shop"
                "Winery"

            */
      if (isSeller) {
        const businessCategories =
          profile.current.roles[sellerIndex].data.category;
        setSelectedBusinessCategories({
          ...selectedBusinessCaterories,
          agricultural_assoc: businessCategories.agricultural_assoc || false,
          chef: businessCategories.chef || false,
        });
      }
      // Attachments inputs:
      const userFiles = user.files.map((file, i) => {
        const { id, file_data } = file;
        const fileObject = {
          id,
          name: file_data.split("/")[2],
        };
        return fileObject;
      });
      setProfileAttachments([...userFiles]);
    }
  }, [profile.current]);

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContainer__block}>
        <h1
          className={styles.formContainer__heading}
          id="profileHub-title"
          tabIndex="-1"
        >
          Welcome to Your O<strong>ntario</strong>
          <em>Fresh</em>
          <span>.ca</span> Profile Hub
        </h1>
        <p>
          This is where you can manage your profile, connect with other
          businesses, post classifieds and <Link to="/key-features">more</Link>!
        </p>
        {/*
                <p>Are you a member based organization or a farmers’ market looking to expand your visibility?<br />
                    Contact us @ <a href='mailto:support@ontariofresh.ca'>support@ontariofresh.ca</a> to learn more!</p>
                */}
        <nav className={styles.profileNav}>
          <ul className={styles.profileNav__ul}>
            {(isBuyer || isSeller || isProcessor || isServiceProvider) && (
              <li className={styles.profileNav__li}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to={`/profile/${slug}`}
                  className={styles.profileNav__link}
                >
                  View Your Business-Facing Profile
                </Link>
              </li>
            )}
            {isVendor && (
              <li className={styles.profileNav__li}>
                <Link
                  to={`//${locationPrefix}.ontariofresh.ca/profile/${slug}`}
                  className={styles.profileNav__link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Your Consumer-Facing Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {/*

                    This form’s content is now going to go into the user’s account settings area.

                    <form
                        id={FORM_ID}
                        noValidate
                        onSubmit={e => e.preventDefault()}
                    >
                        <h2>My profile types:</h2>
                        <FormCheckboxesGroup
                            id='profileCheckboxes'
                            checkboxes={PROFILES}
                            selectedCheckboxes={selectedProfiles}
                            setCheckboxStates={setSelectedProfiles}
                            errorMessage={errorMessages['profileCheckboxes']}
                        />
                        <input
                            type='submit'
                            value='Change my profile types'
                            aria-describedby={`${FORM_ID}-submit-desc`}
                        />
                        <p
                            id={`${FORM_ID}-submit-desc`}
                            aria-hidden='true'
                        >
                            <strong>Warning</strong>: Changing your profile types will delete all of your entered information under the following headings and you’ll need to re-enter all of your information.
                        </p>
                    </form>
                */}

        {/*
                    NOTE: The following set of buttons is just temporary.
                */}
        {/*
                <div style={{ marginBottom: '1.45rem' }}>
                    <button
                        onClick={e => updateUsersProfiles(e, 'buyer')}
                        style={{
                            color: usersProfiles.find(up => up === 'buyer') ? 'green' : 'red'
                        }}
                    >
                        Buyer
                    </button>
                    &nbsp;
                    <button
                        onClick={e => updateUsersProfiles(e, 'seller')}
                        style={{
                            color: usersProfiles.find(up => up === 'seller') ? 'green' : 'red'
                        }}
                    >
                        Seller
                    </button>
                    &nbsp;
                    <button
                        onClick={e => updateUsersProfiles(e, 'vendor')}
                        style={{
                            color: usersProfiles.find(up => up === 'vendor') ? 'green' : 'red'
                        }}
                    >
                        Vendor
                    </button>
                    &nbsp;
                    <button
                        onClick={e => updateUsersProfiles(e, 'processor')}
                        style={{
                            color: usersProfiles.find(up => up === 'processor') ? 'green' : 'red'
                        }}
                    >
                        Processor
                    </button>
                    &nbsp;
                    <button
                        onClick={e => updateUsersProfiles(e, 'service_provider')}
                        style={{
                            color: usersProfiles.find(up => up === 'service_provider') ? 'green' : 'red'
                        }}
                    >
                        Service Provider
                    </button>
                </div>
                */}

        <Accordion allowMultipleExpanded={true} allowZeroExpanded={true}>
          <FormProfileAccordianItem
            heading="General Business Information"
            intro={[
              "Please provide your general business information and a short description below.",
            ]}
            client={client}
            ids={ids}
            formId="generalBusinessInformationForm"
            validateForm={validateGeneralBusinessInformationForm}
            inputStates={{
              inputFirstName,
              inputLastName,
              inputBusinessName,
              inputTitle,
              inputOntarioAddress,
              inputCityTown,
              inputPostalCode,
              checkboxGreenbeltRegion,
              inputEmail,
              inputFax,
              inputPhone,
              inputBusinessDescription,
              checkboxHidePersonalInfo,
              inputVendorSpecificDirections,
              selectedVendorSeasons,
              inputVendorFurtherDetails,
            }}
            setErrorMessages={setGeneralBusinessInformationFormErrorMessages}
            setFormValidated={setGeneralBusinessInformationFormValidated}
            errorMessages={
              generalBusinessInformationFormErrorMessages.messageList
            }
            formValidatedMessage={generalBusinessInformationFormValidated}
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            tooltipOffsetElementId="generalBusinessInformationForm"
            inputs={generalBusinessInformationInputs}
            submitValue="Save"
            trailingLink={
              isBuyer || isSeller || isServiceProvider || isProcessor
                ? {
                    route: "/profile/contact",
                    label: "Add additional Business Contacts",
                  }
                : null
            }
          />
          {locationsBusinessHours.length > 0 && (
            <FormProfileAccordianMultipleItems
              heading="Location Details"
              intro={[
                "Please provide your location and business hours below. Your location will be used for distance based searches. Please note: all locations must be in Ontario.",
              ]}
              client={client}
              ids={ids}
              locations={locationsBusinessHours}
              setLocations={setLocationsBusinessHours}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
            />
          )}
          <FormProfileAccordianItem
            heading="Website and Social Media"
            intro={[
              "Please add your website and social media information below following the format indicated.",
            ]}
            client={client}
            ids={ids}
            formId="socialMediaForm"
            validateForm={validateSocialMediaForm}
            inputStates={{
              inputWebsite,
              inputOnlineStore,
              inputFacebook,
              inputInstagram,
              inputTwitter,
              inputLinkedIn,
              inputYouTube,
            }}
            setErrorMessages={setSocialMediaFormErrorMessages}
            setFormValidated={setSocialMediaFormValidated}
            errorMessages={socialMediaFormErrorMessages.messageList}
            formValidatedMessage={socialMediaFormValidated}
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            tooltipOffsetElementId="socialMediaForm"
            inputs={[
              [
                {
                  Component: FormInputText,
                  label: "Online Store",
                  tooltip:
                    "If your online store is hosted on your main website, please provide the link to the correct page. For example: www.mywebsite.com/mystore",
                  id: "onlineStore",
                  type: "url",
                  setInputState: setInputOnlineStore,
                  placeholder: "https://www.yoursite.ca",
                  value: inputOnlineStore,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["onlineStore"],
                },
                {
                  Component: FormInputText,
                  label: "Website",
                  id: "website",
                  type: "url",
                  setInputState: setInputWebsite,
                  placeholder: "https://www.yoursite.ca",
                  value: inputWebsite,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["website"],
                },
                {
                  Component: FormInputText,
                  label: "Facebook",
                  id: "facebook",
                  type: "url",
                  setInputState: setInputFacebook,
                  placeholder: "https://www.facebook.com/yourpage",
                  value: inputFacebook,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["facebook"],
                },
                {
                  Component: FormInputText,
                  label: "Instagram",
                  id: "instagram",
                  type: "text",
                  setInputState: setInputInstagram,
                  placeholder: "@yourbusiness",
                  value: inputInstagram,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["instagram"],
                },
                {
                  Component: FormInputText,
                  label: "Twitter",
                  id: "twitter",
                  type: "text",
                  setInputState: setInputTwitter,
                  placeholder: "@yourbusiness",
                  value: inputTwitter,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["twitter"],
                },
                {
                  Component: FormInputText,
                  label: "YouTube",
                  id: "youTube",
                  type: "url",
                  setInputState: setInputYouTube,
                  placeholder: "https://www.youtube.com/yourchannel",
                  value: inputYouTube,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["youTube"],
                },
                {
                  Component: FormInputText,
                  label: "LinkedIn",
                  id: "linkedIn",
                  type: "url",
                  setInputState: setInputLinkedIn,
                  placeholder: "https://www.linkedin.com/yourpage",
                  value: inputLinkedIn,
                  required: false,
                  errorMessage: socialMediaFormErrorMessages["linkedIn"],
                },
              ],
            ]}
            submitValue="Save"
          />
          <FormAttachmentsAccordionItem
            heading="Profile Picture"
            intro={[
              "Please upload an image of your company logo or a photo that best represents your business.",
            ]}
            client={client}
            ids={ids}
            attachmentFormId="uploadCompanyLogoPhotoForm"
            attachmentFormLabel="Select a file from your device"
            attachmentFormTooltip="Accepts .jpg, .jpeg, .png, .gif, and .bmp files. Max size: 5 MB."
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            validateAttachmentUploadForm={validateUploadCompanyLogoPhotoForm}
            attachments={companyLogoPhoto}
            setAttachments={setCompanyLogoPhoto}
            attachmentsFormErrorMessage={companyLogoPhotoFormErrorMessage}
            setAttachmentsFormErrorMessage={setCompanyLogoPhotoFormErrorMessage}
            attachmentsFormValidated={companyLogoPhotoFormValidated}
            setAttachmentsFormValidated={setCompanyLogoPhotoFormValidated}
            chooseFileButtonValue="<strong>Choose a file</strong> or drag & drop it here."
            attachmentFormSubmitValue="Save"
            acceptFileTypes="images"
            //aspect={16 / 9}
          />
          {isVendor && (
            <FormProfileAccordianItem
              heading="Vendor Profile Highlights"
              formId="publicB2cVendorProfileHighlightsForm"
              client={client}
              ids={ids}
              validateForm={validatePublicVendorProfileHighlightsForm}
              inputStates={{
                selectedVendorIcons,
                selectedProfileMasthead,
                selectedBusinessClassifications,
              }}
              setErrorMessages={
                setPublicVendorProfileHighlightsFormErrorMessages
              }
              setFormValidated={setPublicVendorProfileHighlightsFormValidated}
              errorMessages={
                publicVendorProfileHighlightsFormErrorMessages.messageList
              }
              formValidatedMessage={publicVendorProfileHighlightsFormValidated}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              tooltipOffsetElementId="publicB2cVendorProfileHighlightsForm"
              inputs={[
                {
                  Component: FormCheckboxesGroup,
                  label:
                    "Select up to 3 icons to highlight your business profile in search results:",
                  id: "vendorIconsCheckboxes",
                  flex: false,
                  icons: true,
                  checkboxes: [
                    {
                      label: "Online Store",
                      value: "online_store",
                      icon: true,
                    },
                    {
                      label: "Delivery",
                      value: "delivery",
                      icon: true,
                    },
                    {
                      label: "Organic",
                      value: "organic",
                      icon: true,
                    },
                    {
                      label: "Halal",
                      value: "halal",
                      icon: true,
                    },
                    {
                      label: "Kosher",
                      value: "kosher",
                      icon: true,
                    } /*
                                            {
                                                label: 'Open Year-Round',
                                                value: 'open_year_round',
                                                icon: true
                                            },*/,
                    {
                      label: "Open Seasonaly",
                      value: "open_seasonaly",
                      icon: true,
                    },
                    {
                      label: "Fruits and Vegetables",
                      value: "fruits_vegetables",
                      icon: true,
                    },
                    {
                      label: "Meat",
                      value: "meat",
                      icon: true,
                    },
                    {
                      label: "Fish",
                      value: "fish",
                      icon: true,
                    },
                    {
                      label: "Dairy and Eggs",
                      value: "dairy_eggs",
                      icon: true,
                    },
                    {
                      label: "Nuts, Seeds and Herbs",
                      value: "nuts_seeds_herbs",
                      icon: true,
                    },
                    {
                      label: "Prepared Food",
                      value: "prepared_food",
                      icon: true,
                    },
                    {
                      label: "Alcoholic Beverages",
                      value: "alcoholic_beverages",
                      icon: true,
                    },
                    {
                      label: "Non-alcoholic Beverages",
                      value: "non_alcoholic_beverages",
                      icon: true,
                    },
                    {
                      label: "Grains",
                      value: "grains",
                      icon: true,
                    },
                  ],
                  selectedCheckboxes: selectedVendorIcons,
                  setCheckboxStates: setSelectedVendorIcons,
                  errorMessage:
                    publicVendorProfileHighlightsFormErrorMessages.vendorIconsCheckboxes,
                },
                {
                  Component: FormRadioButtonsGroup,
                  label: "Select a banner image for the top of your profile:",
                  id: "profileMastheadRadioButtons",
                  radioButtons: [
                    {
                      label: "Masthead 1",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_0",
                      masthead: true,
                    },
                    {
                      label: "Masthead 2",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_1",
                      masthead: true,
                    },
                    {
                      label: "Masthead 3",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_2",
                      masthead: true,
                    },
                    {
                      label: "Masthead 4",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_3",
                      masthead: true,
                    },
                    {
                      label: "Masthead 5",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_4",
                      masthead: true,
                    },
                    {
                      label: "Masthead 6",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_5",
                      masthead: true,
                    },
                    {
                      label: "Masthead 7",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_6",
                      masthead: true,
                    },
                    {
                      label: "Remove Masthead",
                      group: "profileMastheadRadioButtons",
                      value: "masthead_7",
                      masthead: false,
                    },
                  ],
                  selectedRadioButtons: selectedProfileMasthead,
                  setRadioButtonsStates: setSelectedProfileMasthead,
                  errorMessage:
                    publicVendorProfileHighlightsFormErrorMessages.profileMastheadRadioButtons,
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Specialty Practice:",
                  instructions:
                    "Check any of the following business classifications relevant for your business:",
                  id: "businessClassificationsCheckboxes",
                  checkboxes: [
                    {
                      label: "Appropriate for Allergies / Special Diets",
                      value: "sp_appropriate_for_allergies_special_diets",
                    },
                    {
                      label: "Certified Organic",
                      value: "sp_certified_organic",
                    },
                    {
                      label: "Halal",
                      value: "sp_halal",
                    },
                    {
                      label: "Kosher",
                      value: "sp_kosher",
                    },
                    {
                      label: "Specialty",
                      value: "sp_specialty",
                    },
                  ],
                  selectedCheckboxes: selectedBusinessClassifications,
                  setCheckboxStates: setSelectedBusinessClassifications,
                },
              ]}
              submitValue="Save"
            />
          )}
          <FormAttachmentsAccordionItem
            heading="Photo Gallery"
            intro={["Upload up to 6 images to your photo gallery."]}
            client={client}
            ids={ids}
            attachmentFormId="photoGalleryForm"
            attachmentFormLabel="Select a file from your device"
            attachmentFormTooltip="Accepts .jpg, .jpeg, .png, .gif, and .bmp files. Max size: 5 MB."
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            validateAttachmentUploadForm={
              validatePhotoGalleryAttachmentUploadForm
            }
            attachments={photoGalleryAttachments}
            setAttachments={setPhotoGalleryAttachments}
            attachmentsFormErrorMessage={
              photoGalleryAttachmentsFormErrorMessage
            }
            setAttachmentsFormErrorMessage={
              setPhotoGalleryAttachmentsFormErrorMessage
            }
            attachmentsFormValidated={photoGalleryAttachmentsFormValidated}
            setAttachmentsFormValidated={
              setPhotoGalleryAttachmentsFormValidated
            }
            chooseFileButtonValue="<strong>Choose a file</strong> or drag & drop it here."
            attachmentFormSubmitValue="Save"
            acceptFileTypes="images"
            aspect={16 / 9}
            manageAttachmentsFormId="managePhotoGalleryAttachments"
            manageAttachmentsFormLegend="Upload up to 6 images to your photo gallery."
            validateManageAttachmentsForm={
              validateManagePhotoGalleryAttachmentsForm
            }
            selectedAttachments={selectedPhotoGalleryAttachments}
            setSelectedAttachments={setSelectedPhotoGalleryAttachments}
            selectedAttachmentsFormErrorMessage={
              selectedPhotoGalleryAttachmentsFormErrorMessage
            }
            setSelectedAttachmentsFormErrorMessage={
              setSelectedPhotoGalleryAttachmentsFormErrorMessage
            }
            selectedAttachmentsFormValidated={
              selectedPhotoGalleryAttachmentsFormValidated
            }
            setSelectedAttachmentsFormValidated={
              setSelectedPhotoGalleryAttachmentsFormValidated
            }
            manageAttachmentsSubmitValue="Update Selected"
            usersProfiles={usersProfiles}
          />
          {(isBuyer || isSeller || isVendor || isProcessor) && (
            <FormProductSelector
              heading="Products"
              intro={[
                "Add the  products you offer under each of the categories below. We encourage you to be as specific as possible when filling in your offerings (Ex. Royal Gala Apples rather than just Apples).",
              ]}
              client={client}
              ids={ids}
              id="productSelector"
              currentProfiles={usersProfiles}
              updateProductList={updateProductList}
              products={products}
              setProducts={setProducts}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
            />
          )}
          {(isBuyer || isSeller || isVendor || isProcessor) && (
            <FormProfileAccordianItem
              heading="Delivery Details"
              formId="deliveryDetailsForm"
              client={client}
              ids={ids}
              validateForm={validateDeliveryDetailsForm}
              inputStates={{
                selectedDeliveryDetailsBuyerOfferDelivery,
                selectedDeliveryDetailsSellerOfferDelivery,
                selectedDeliveryDetailsVendorOfferDelivery,
                inputDeliveryDetailsVendorFurtherDetails,
                selectedDeliveryDetailsProcessorOfferDelivery,
              }}
              setFormValidated={setDeliveryDetailsFormValidated}
              formValidatedMessage={deliveryDetailsFormValidated}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              tooltipOffsetElementId="deliveryDetailsForm"
              inputs={usersDeliveryDetailsFieldsets}
              submitValue="Save"
            />
          )}
          <FormProfileAccordianItem
            heading="Business Type"
            intro={[
              "Please select at least one business type that best represents your business.",
            ]}
            client={client}
            ids={ids}
            formId="businessCategoriesForm"
            validateForm={validateBusinessCategoriesForm}
            inputStates={{
              selectedBusinessCaterories,
            }}
            setFormValidated={setBusinessCateroriesFormValidated}
            formValidatedMessage={businessCateroriesFormValidated}
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            inputs={[
              {
                Component: FormCheckboxesGroup,
                label: "Select all that apply:",
                id: "businessCategoriesCheckboxes",
                checkboxes: [...businessCategoriesCheckboxes],
                selectedCheckboxes: selectedBusinessCaterories,
                setCheckboxStates: setSelectedBusinessCategories,
              },
            ]}
            submitValue="Save"
          />
          {isSeller && (
            <FormProfileAccordianItem
              heading="Additional Seller Details"
              formId="sellerSpecificDetailsForm"
              client={client}
              ids={ids}
              validateForm={validateSellerSpecificDetailsForm}
              inputStates={{
                selectedSellerBusinessClassifications,
                selectedSellerPreferredPaymentMethods,
                selectedSellerBusinessSize,
                selectedSellerThirdPartyInsurance,
              }}
              setErrorMessages={setSellerSpecificDetailsFormErrorMessages}
              setFormValidated={setSellerSpecificDetailsFormValidated}
              errorMessages={sellerSpecificDetailsFormErrorMessages.messageList}
              formValidatedMessage={sellerSpecificDetailsFormValidated}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              inputs={[
                {
                  Component: FormCheckboxesGroup,
                  label: "Specialty Practice:",
                  instructions:
                    "Check any of the following business classifications relevant for your business:",
                  id: "sellerBusinessClassificationsCheckboxes",
                  checkboxes: [
                    {
                      label: "Appropriate for Allergies / Special Diets",
                      value: "appropriate_for_allergies_special_diets",
                    },
                    /*
                                            {
                                                label: 'Artisan / Specialty',
                                                value: 'artisan_specialty'
                                            },
                                            {
                                                label: 'Certified Local Sustainable',
                                                value: 'certified_local_sustainable'
                                            },
                                            */
                    {
                      label: "Certified Organic",
                      value: "certified_organic",
                    },
                    /*
                                            {
                                                label: 'Conventional',
                                                value: 'conventional'
                                            },
                                            {
                                                label: 'Natural Focus',
                                                value: 'natural_focus'
                                            },
                                            {
                                                label: 'Foodland Ontario Certified',
                                                value: 'foodland_ontario_certified'
                                            },
                                            */
                    {
                      label: "Halal",
                      value: "halal",
                    },
                    {
                      label: "Kosher",
                      value: "kosher",
                    },
                    {
                      label: "Specialty",
                      value: "specialty",
                    },
                  ],
                  selectedCheckboxes: selectedSellerBusinessClassifications,
                  setCheckboxStates: setSelectedSellerBusinessClassifications,
                  createUniqueIds: "sellerSpecificDetailsForm",
                },
                /*
                                    {
                                        Component: FormCheckboxesGroup,
                                        label: 'Do you have third party insurance?',
                                        id: 'sellerThirdPartyInsuranceCheckboxes',
                                        checkboxes: [
                                            {
                                                label: 'Yes',
                                                value: 'third_party_insurance'
                                            },
                                        ],
                                        selectedCheckboxes: selectedSellerThirdPartyInsurance,
                                        setCheckboxStates: setSelectedSellerThirdPartyInsurance,
                                        createUniqueIds: 'sellerSpecificDetailsForm'
                                    },
                                    */
                {
                  Component: FormCheckboxesGroup,
                  label: "Preferred Payment Methods:",
                  id: "sellerPreferredPaymentMethodsCheckboxes",
                  checkboxes: [
                    {
                      label: "Credit / Debit",
                      value: "visa_debit",
                    },
                    {
                      label: "Cash on Delivery",
                      value: "cod",
                    },
                    {
                      label: "Purchase Order / Invoice",
                      value: "invoice_po",
                    },
                  ],
                  selectedCheckboxes: selectedSellerPreferredPaymentMethods,
                  setCheckboxStates: setSelectedSellerPreferredPaymentMethods,
                  createUniqueIds: "sellerSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "In what volumes do you sell?",
                  id: "sellerBusinessSizeCheckboxes",
                  checkboxes: [
                    {
                      label: "Small",
                      value: "small",
                    },
                    {
                      label: "Medium",
                      value: "medium",
                    },
                    {
                      label: "Large",
                      value: "large",
                    },
                  ],
                  selectedCheckboxes: selectedSellerBusinessSize,
                  setCheckboxStates: setSelectedSellerBusinessSize,
                  errorMessage:
                    sellerSpecificDetailsFormErrorMessages.sellerBusinessSizeCheckboxes,
                  createUniqueIds: "sellerSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you have third party insurance?",
                  id: "sellerThirdPartyInsuranceCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ],
                  selectedCheckboxes: selectedSellerThirdPartyInsurance,
                  setCheckboxStates: setSelectedSellerThirdPartyInsurance,
                  errorMessage:
                    sellerSpecificDetailsFormErrorMessages.sellerThirdPartyInsuranceCheckboxes,
                  createUniqueIds: "sellerSpecificDetailsForm",
                },
              ]}
              submitValue="Save"
            />
          )}
          {isBuyer && (
            <FormProfileAccordianItem
              heading="Additional Buyer Details"
              formId="buyerSpecificDetailsForm"
              client={client}
              ids={ids}
              validateForm={validateBuyerSpecificDetailsForm}
              inputStates={{
                selectedBuyerBusinessClassifications,
                selectedBuyerPreferredPaymentMethods,
                selectedBuyerBusinessSize,
                selectedBuyerThirdPartyInsurance,
              }}
              setErrorMessages={setBuyerSpecificDetailsFormErrorMessages}
              setFormValidated={setBuyerSpecificDetailsFormValidated}
              errorMessages={buyerSpecificDetailsFormErrorMessages.messageList}
              formValidatedMessage={buyerSpecificDetailsFormValidated}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              tooltipOffsetElementId="buyerSpecificDetailsForm"
              inputs={[
                {
                  Component: FormCheckboxesGroup,
                  label: "Speciality Practice:",
                  tooltip:
                    "Please select any of the following business classifications that you require.",
                  id: "buyerBusinessClassificationsCheckboxes",
                  checkboxes: [
                    {
                      label: "Appropriate for Allergies / Special Diets",
                      value: "appropriate_for_allergies_special_diets",
                    },
                    /*
                                            {
                                                label: 'Artisan / Specialty',
                                                value: 'artisan_specialty'
                                            },
                                            {
                                                label: 'Certified Local Sustainable',
                                                value: 'certified_local_sustainable'
                                            },
                                            */
                    {
                      label: "Certified Organic",
                      value: "certified_organic",
                    },
                    /*
                                            {
                                                label: 'Conventional',
                                                value: 'conventional'
                                            },
                                            {
                                                label: 'Natural Focus',
                                                value: 'natural_focus'
                                            },
                                            {
                                                label: 'Foodland Ontario Certified',
                                                value: 'foodland_ontario_certified'
                                            },
                                            */
                    {
                      label: "Halal",
                      value: "halal",
                    },
                    {
                      label: "Kosher",
                      value: "kosher",
                    },
                    {
                      label: "Specialty",
                      value: "specialty",
                    },
                  ],
                  selectedCheckboxes: selectedBuyerBusinessClassifications,
                  setCheckboxStates: setSelectedBuyerBusinessClassifications,
                  createUniqueIds: "buyerSpecificDetailsForm",
                },
                /*
                                    {
                                        Component: FormCheckboxesGroup,
                                        label: 'Do you have third party insurance?',
                                        id: 'buyerThirdPartyInsuranceCheckboxes',
                                        checkboxes: [
                                            {
                                                label: 'Yes',
                                                value: 'third_party_insurance'
                                            },
                                        ],
                                        selectedCheckboxes: selectedBuyerThirdPartyInsurance,
                                        setCheckboxStates: setSelectedBuyerThirdPartyInsurance,
                                        createUniqueIds: 'buyerSpecificDetailsForm'
                                    },
                                    */
                {
                  Component: FormCheckboxesGroup,
                  label: "Preferred Payment Methods:",
                  id: "buyerPreferredPaymentMethodsCheckboxes",
                  checkboxes: [
                    {
                      label: "Credit / Debit",
                      value: "visa_debit",
                    },
                    {
                      label: "Cash on Delivery",
                      value: "cod",
                    },
                    {
                      label: "Purchase Order / Invoice",
                      value: "invoice_po",
                    },
                  ],
                  selectedCheckboxes: selectedBuyerPreferredPaymentMethods,
                  setCheckboxStates: setSelectedBuyerPreferredPaymentMethods,
                  createUniqueIds: "buyerSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "In what volumes do you buy?",
                  id: "buyerBusinessSizeCheckboxes",
                  checkboxes: [
                    {
                      label: "Small",
                      value: "small",
                    },
                    {
                      label: "Medium",
                      value: "medium",
                    },
                    {
                      label: "Large",
                      value: "large",
                    },
                  ],
                  selectedCheckboxes: selectedBuyerBusinessSize,
                  setCheckboxStates: setSelectedBuyerBusinessSize,
                  errorMessage:
                    buyerSpecificDetailsFormErrorMessages.buyerBusinessSizeCheckboxes,
                  createUniqueIds: "buyerSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you have third party insurance?",
                  id: "buyerThirdPartyInsuranceCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ],
                  selectedCheckboxes: selectedBuyerThirdPartyInsurance,
                  setCheckboxStates: setSelectedBuyerThirdPartyInsurance,
                  errorMessage:
                    buyerSpecificDetailsFormErrorMessages.buyerThirdPartyInsuranceCheckboxes,
                  createUniqueIds: "buyerSpecificDetailsForm",
                },
              ]}
              submitValue="Save"
            />
          )}
          {isProcessor && (
            <FormProfileAccordianItem
              heading="Additional Processor Details"
              formId="processorSpecificDetailsForm"
              client={client}
              ids={ids}
              validateForm={validateProcessorSpecificDetailsForm}
              inputStates={{
                selectedProcessingMethodsAvailable,
                selectedBusinessClassificationsForProductsYouProcess,
                selectedGeneralProcessingFormats,
                processingVolumes,
                coPackingServices,
                privateLabelServices,
                customProcessTakeSpecialOrders,
                thirdPartyLiabilityInsurance,
              }}
              setErrorMessages={setProcessorSpecificDetailsFormErrorMessages}
              setFormValidated={
                setProcessorSpecificDetailsFormValidationMessage
              }
              errorMessages={
                processorSpecificDetailsFormErrorMessages.messageList
              }
              formValidatedMessage={
                processorSpecificDetailsFormValidationMessage
              }
              inputs={[
                {
                  Component: FormCheckboxesGroup,
                  label: "Add processing services you offer:",
                  id: "processingMethodsAvailableCheckboxes",
                  checkboxes: [
                    {
                      label: "Abattoir Services",
                      value: "abattoir_services",
                    },
                    {
                      label: "Baking",
                      value: "baking",
                    },
                    {
                      label: "Brewing",
                      value: "brewing",
                    },
                    {
                      label: "Canning",
                      value: "canning",
                    },
                    {
                      label: "Cheese Making",
                      value: "cheese_making",
                    },
                    {
                      label: "Chopping / Dicing / Slicing",
                      value: "chopping_dicing_slicing",
                    },
                    {
                      label: "Cooking",
                      value: "cooking",
                    },
                    {
                      label: "Curing",
                      value: "curing",
                    },
                    {
                      label: "Distilling",
                      value: "distilling",
                    },
                    {
                      label: "Drying",
                      value: "drying",
                    },
                    {
                      label: "Freezing",
                      value: "freezing",
                    },
                    {
                      label: "Further Meat Processing",
                      value: "further_meat_processing",
                    },
                    {
                      label: "Juicing / Pressing",
                      value: "juicing_pressing",
                    },
                    {
                      label: "Milling",
                      value: "milling",
                    },
                    {
                      label: "Other",
                      value: "other",
                    },
                    {
                      label: "Other Dairy Processing",
                      value: "other_dairy_processing",
                    },
                    {
                      label: "Packing",
                      value: "packing",
                    },
                    {
                      label: "Peeling",
                      value: "peeling",
                    },
                    {
                      label: "Pureeing",
                      value: "pureeing",
                    },
                    {
                      label: "Smoking",
                      value: "smoking",
                    },
                    {
                      label: "Wine Making",
                      value: "wine_making",
                    },
                  ],
                  selectedCheckboxes: selectedProcessingMethodsAvailable,
                  setCheckboxStates: setSelectedProcessingMethodsAvailable,
                  createUniqueIds:
                    "selectedProcessingMethodsAvailableProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Specialty Practice:",
                  instructions:
                    "Check any of the following business classifications relevant for your business:",
                  id: "processingMethodsAvailableCheckboxes",
                  checkboxes: [
                    {
                      label: "Appropriate for Allergies / Special Diets",
                      value: "appropriate_for_allergies_special_diets",
                    },
                    /*
                                            {
                                                label: 'Artisan / Specialty',
                                                value: 'artisan_specialty'
                                            },
                                            {
                                                label: 'Certified Local Sustainable',
                                                value: 'certified_local_sustainable'
                                            },
                                            */
                    {
                      label: "Certified Organic",
                      value: "certified_organic",
                    },
                    /*
                                            {
                                                label: 'Conventional',
                                                value: 'conventional'
                                            },
                                            {
                                                label: 'Natural Focus',
                                                value: 'natural_focus'
                                            },
                                            {
                                                label: 'Foodland Ontario Certified',
                                                value: 'foodland_ontario_certified'
                                            },
                                            */
                    {
                      label: "Halal",
                      value: "halal",
                    },
                    {
                      label: "Kosher",
                      value: "kosher",
                    },
                    {
                      label: "Specialty",
                      value: "specialty",
                    },
                  ],
                  selectedCheckboxes:
                    selectedBusinessClassificationsForProductsYouProcess,
                  setCheckboxStates:
                    setSelectedBusinessClassificationsForProductsYouProcess,
                  createUniqueIds:
                    "selectedBusinessClassificationsForProductsYouProcessProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "General Processing Formats:",
                  id: "generalProcessingFormatsCheckboxes",
                  checkboxes: [
                    {
                      label: "Further Processing",
                      value: "further_processing",
                    },
                    {
                      label: "Large-scale Food Service",
                      value: "large_scale_food_service",
                    },
                    {
                      label: "Restaurants or Food Service",
                      value: "restaurants_or_food_service",
                    },
                    {
                      label: "Retail",
                      value: "retail",
                    },
                  ],
                  selectedCheckboxes: selectedGeneralProcessingFormats,
                  setCheckboxStates: setSelectedGeneralProcessingFormats,
                  createUniqueIds:
                    "selectedGeneralProcessingFormatsProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "In what volumes do you process?",
                  id: "processingVolumesCheckboxes",
                  checkboxes: [
                    {
                      label: "Small",
                      value: "small",
                    },
                    {
                      label: "Medium",
                      value: "medium",
                    },
                    {
                      label: "Large",
                      value: "large",
                    },
                  ],
                  selectedCheckboxes: processingVolumes,
                  setCheckboxStates: setProcessingVolumes,
                  errorMessage:
                    processorSpecificDetailsFormErrorMessages.processingVolumesCheckboxes,
                  createUniqueIds:
                    "processingVolumesProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you offer co-packing services?",
                  id: "coPackingServicesCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                    {
                      label: "Negotiable",
                      value: "negotiable",
                    },
                  ],
                  selectedCheckboxes: coPackingServices,
                  setCheckboxStates: setCoPackingServices,
                  errorMessage:
                    processorSpecificDetailsFormErrorMessages.coPackingServicesCheckboxes,
                  createUniqueIds:
                    "coPackingServicesProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you offer private label services?",
                  id: "privateLabelServicesCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                    {
                      label: "Negotiable",
                      value: "negotiable",
                    },
                  ],
                  selectedCheckboxes: privateLabelServices,
                  setCheckboxStates: setPrivateLabelServices,
                  errorMessage:
                    processorSpecificDetailsFormErrorMessages.privateLabelServicesCheckboxes,
                  createUniqueIds:
                    "privateLabelServicesProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you custom process or take special orders?",
                  id: "customProcessTakeSpecialOrdersCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                    {
                      label: "Negotiable",
                      value: "negotiable",
                    },
                  ],
                  selectedCheckboxes: customProcessTakeSpecialOrders,
                  setCheckboxStates: setCustomProcessTakeSpecialOrders,
                  errorMessage:
                    processorSpecificDetailsFormErrorMessages.customProcessTakeSpecialOrdersCheckboxes,
                  createUniqueIds:
                    "customProcessTakeSpecialOrdersProcessorSpecificDetailsForm",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Do you have third-party liability insurance?",
                  id: "thirdPartyLiabilityInsuranceCheckboxes",
                  checkboxes: [
                    {
                      label: "Yes",
                      value: "yes",
                    },
                    {
                      label: "No",
                      value: "no",
                    },
                  ],
                  selectedCheckboxes: thirdPartyLiabilityInsurance,
                  setCheckboxStates: setThirdPartyLiabilityInsurance,
                  errorMessage:
                    processorSpecificDetailsFormErrorMessages.thirdPartyLiabilityInsuranceCheckboxes,
                  createUniqueIds:
                    "thirdPartyLiabilityInsuranceProcessorSpecificDetailsForm",
                },
              ]}
              submitValue="Save"
            />
          )}
          {(isBuyer || isSeller || isProcessor) && (
            <FormProfileAccordianItem
              heading="Food Safety and Traceability Standards"
              formId="foodSafetyTraceabilityStandardsForm"
              client={client}
              ids={ids}
              validateForm={validateFoodSafetyTraceabilityStandardsForm}
              inputStates={{
                // selectedOfferedFoodSafetyTraceabilityStandards,
                // selectedRequiredFoodSafetyTraceabilityStandards,
                selectedSellerRequiredFoodSafetyTraceabilityStandards,
                selectedBuyerRequiredFoodSafetyTraceabilityStandards,
                selectedProcessorRequiredFoodSafetyTraceabilityStandards,
              }}
              setFormValidated={setFoodSafetyTraceabilityStandardsFormValidated}
              formValidatedMessage={
                foodSafetyTraceabilityStandardsFormValidated
              }
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              inputs={foodSafetyTraceabilityStandardsFormInputs}
              submitValue="Save"
            />
          )}
          {isServiceProvider && (
            <FormProfileAccordianItem
              heading="Services Offered and Wanted"
              intro={[
                "Please indicate which services you provide and/or which services you are looking for.",
              ]}
              client={client}
              ids={ids}
              formId="servicesForm"
              validateForm={validateServicesForm}
              inputStates={{
                selectedServicesOffered,
                selectedServicesWanted,
              }}
              setFormValidated={setServicesFormValidated}
              formValidatedMessage={servicesFormValidated}
              currentTooltip={currentTooltip}
              setCurrentTooltip={setCurrentTooltip}
              inputs={[
                {
                  Component: FormCheckboxesGroup,
                  label: "Services Offered:",
                  id: "servicesOfferedCheckboxes",
                  checkboxes: [
                    {
                      label: "Abattoir Services (meat)",
                      value: "abattoir_services_meat",
                    },
                    {
                      label: "Advertising, Marketing, Promotions",
                      value: "advertising_marketing_promotions",
                    },
                    {
                      label: "Cold Storage (Refrigerated Warehousing)",
                      value: "cold_storage_refrigerated_warehousing",
                    },
                    {
                      label: "Consolidation, Aggregation, Hub Services",
                      value: "consolidation_aggregation_hub_services",
                    },
                    {
                      label: "Delivery",
                      value: "delivery",
                    },
                    {
                      label: "Frozen Storage",
                      value: "frozen_storage",
                    },
                    {
                      label: "Full-Serviced Distribution",
                      value: "full_serviced_distribution",
                    },
                    {
                      label: "Other Specialized Storage",
                      value: "other_specialized_storage",
                    },
                    {
                      label: "Post-Harvest Handling or Packing",
                      value: "post_harvest_handling_or_packing",
                    },
                    {
                      label: "Processing",
                      value: "processing",
                    },
                    {
                      label: "Sharing Purchase Orders",
                      value: "sharing_purchase_orders",
                    },
                    {
                      label: "Transportation and Climate Control",
                      value: "transportation_and_climate_control",
                    },
                    {
                      label: "Warehousing",
                      value: "warehousing",
                    },
                  ],
                  selectedCheckboxes: selectedServicesOffered,
                  setCheckboxStates: setSelectedServicesOffered,
                  createUniqueIds: "servicesFormServicesOffered",
                },
                {
                  Component: FormCheckboxesGroup,
                  label: "Services Wanted:",
                  id: "servicesWantedCheckboxes",
                  emphasized: true,
                  checkboxes: [
                    {
                      label: "Abattoir Services (meat)",
                      value: "abattoir_services_meat",
                    },
                    {
                      label: "Advertising, Marketing, Promotions",
                      value: "advertising_marketing_promotions",
                    },
                    {
                      label: "Cold Storage (Refrigerated Warehousing)",
                      value: "cold_storage_refrigerated_warehousing",
                    },
                    {
                      label: "Consolidation, Aggregation, Hub Services",
                      value: "consolidation_aggregation_hub_services",
                    },
                    {
                      label: "Delivery",
                      value: "delivery",
                    },
                    {
                      label: "Frozen Storage",
                      value: "frozen_storage",
                    },
                    {
                      label: "Full-Serviced Distribution",
                      value: "full_serviced_distribution",
                    },
                    {
                      label: "Other Specialized Storage",
                      value: "other_specialized_storage",
                    },
                    {
                      label: "Post-Harvest Handling or Packing",
                      value: "post_harvest_handling_or_packing",
                    },
                    {
                      label: "Processing",
                      value: "processing",
                    },
                    {
                      label: "Sharing Purchase Orders",
                      value: "sharing_purchase_orders",
                    },
                    {
                      label: "Transportation and Climate Control",
                      value: "transportation_and_climate_control",
                    },
                    {
                      label: "Warehousing",
                      value: "warehousing",
                    },
                  ],
                  selectedCheckboxes: selectedServicesWanted,
                  setCheckboxStates: setSelectedServicesWanted,
                  createUniqueIds: "servicesFormServicesWanted",
                },
              ]}
              submitValue="Save"
            />
          )}
          <FormAttachmentsAccordionItem
            heading="Attachments"
            intro={[
              "This is an opportunity to provide more detailed information (ex. order forms, brochures, product lists). The title of the document will be displayed on your profile so please ensure you are using clear titles.",
            ]}
            client={client}
            ids={ids}
            attachmentFormId="profileAttachmentUploadForm"
            attachmentFormLabel="Select a file from your device"
            validateAttachmentUploadForm={validateProfileAttachmentUploadForm}
            attachments={profileAttachments}
            setAttachments={setProfileAttachments}
            attachmentsFormErrorMessage={profileAttachmentsFormErrorMessage}
            setAttachmentsFormErrorMessage={
              setProfileAttachmentsFormErrorMessage
            }
            attachmentsFormValidated={profileAttachmentsFormValidated}
            setAttachmentsFormValidated={setProfileAttachmentsFormValidated}
            chooseFileButtonValue="<strong>Choose a file</strong> or drag & drop it here."
            acceptFileTypes="documents"
            manageAttachmentsFormId="manageProfileAttachments"
            manageAttachmentsFormLegend="Select the attachments you wish to delete"
            validateManageAttachmentsForm={validateManageProfileAttachmentsForm}
            selectedAttachments={selectedProfileAttachments}
            setSelectedAttachments={setSelectedProfileAttachments}
            selectedAttachmentsFormErrorMessage={
              selectedProfileAttachmentsFormErrorMessage
            }
            setSelectedAttachmentsFormErrorMessage={
              setSelectedProfileAttachmentsFormErrorMessage
            }
            selectedAttachmentsFormValidated={
              selectedProfileAttachmentsFormValidated
            }
            setSelectedAttachmentsFormValidated={
              setSelectedProfileAttachmentsFormValidated
            }
            currentTooltip={currentTooltip}
            setCurrentTooltip={setCurrentTooltip}
            manageAttachmentsSubmitValue="Save"
          />
        </Accordion>
      </div>
    </div>
  );
};

ProfileHub.defaultName = "ProfileHub";

ProfileHub.defaultProps = {
  usersPreviousProfiles: [
    "vendor",
    "seller",
    "processor",
    "buyer",
    "service_provider",
  ],
  previousCompanyLogoPhoto:
    "/uploads/company-logo-photo/headshot_michael_anderson_190918.png",
  previousPhotoGalleryAttachments: [
    {
      id: "090615",
      src: "/uploads/photo-gallery/photo_gallery_090615.png",
    },
    {
      id: "100121",
      src: "/uploads/photo-gallery/photo_gallery_100121.png",
    },
    {
      id: "190918",
      src: "/uploads/photo-gallery/photo_gallery_190918.png",
    },
  ],
  profilesBusinessCategories: [
    {
      profile: "buyer",
      label: "Aggregator or Hub",
      value: "aggregator_or_hub",
    },
    {
      profile: "seller",
      label: "Agricultural Assoc.",
      value: "agricultural_assoc",
    },
    {
      profile: "vendor",
      label: "Agritourism",
      value: "agritourism",
    },
    {
      profile: "processor",
      label: "Bakery",
      value: "bakery",
    },
    {
      profile: "all",
      label: "Brewery",
      value: "brewery",
    },
    {
      profile: "buyer",
      label: "Buyer",
      value: "buyer",
    },
    {
      profile: "seller",
      label: "Chef",
      value: "chef",
    },
    {
      profile: "vendor",
      label: "Cidery",
      value: "cidery",
    },
    {
      profile: "processor",
      label: "Co-op",
      value: "co_op",
    },
    {
      profile: "service_provider",
      label: "Community Agriculture",
      value: "community_agriculture",
    },
    {
      profile: "buyer",
      label: "Custom processor",
      value: "custom_processor",
    },
    {
      profile: "seller",
      label: "Distillery",
      value: "distillery",
    },
    {
      profile: "vendor",
      label: "Distributor",
      value: "distributor",
    },
    {
      profile: "processor",
      label: "Equip / Machinery Sales",
      value: "equip_machinery_sales",
    },
    {
      profile: "service_provider",
      label: "Farmers’ Market",
      value: "farmers_market",
    },
    {
      profile: "b2b",
      label: "Food Bank",
      value: "food_bank",
    },
    {
      profile: "buyer",
      label: "Food Service Provider",
      value: "food_service_provider",
    },
    {
      profile: "seller",
      label: "Government",
      value: "government",
    },
    {
      profile: "vendor",
      label: "Greenhouse",
      value: "greenhouse",
    },
    {
      profile: "processor",
      label: "Grocery Store",
      value: "grocery_store",
    },
    {
      profile: "service_provider",
      label: "Group Purchasing",
      value: "group_purchasing",
    },
    {
      profile: "buyer",
      label: "Grower / Producer",
      value: "grower_producer",
    },
    {
      profile: "seller",
      label: "Input Provider",
      value: "input_provider",
    },
    {
      profile: "vendor",
      label: "Institution",
      value: "institution",
    },
    {
      profile: "processor",
      label: "Logistics",
      value: "logistics",
    },
    {
      profile: "service_provider",
      label: "Marketing / Advertising",
      value: "marketing_advertising",
    },
    {
      profile: "buyer",
      label: "Nursery",
      value: "nursery",
    },
    {
      profile: "seller",
      label: "On-farm Market",
      value: "on_farm_market",
    },
    {
      profile: "vendor",
      label: "Other Agriculture",
      value: "other_agriculture",
    },
    {
      profile: "service_provider",
      label: "Other Support Industry",
      value: "other_support_industry",
    },
    {
      profile: "b2b",
      label: "Packaging / Shipping",
      value: "packaging_shipping",
    },
    {
      profile: "processor",
      label: "Packer",
      value: "packer",
    },
    {
      profile: "service_provider",
      label: "Pick-your-own",
      value: "pick_your_own",
    },
    {
      profile: "processor",
      label: "Processor",
      value: "processor",
    },
    {
      profile: "buyer",
      label: "Regional Food Network",
      value: "regional_food_network",
    },
    {
      profile: "seller",
      label: "Restaurant",
      value: "restaurant",
    },
    {
      profile: "vendor",
      label: "Retail Operator / Shop",
      value: "retail_operator_shop",
    },
    {
      profile: "processor",
      label: "School Supplier / Vendor",
      value: "school_supplier_vendor",
    },
    {
      profile: "service_provider",
      label: "School or Cafeteria",
      value: "school_or_cafeteria",
    },
    {
      profile: "buyer",
      label: "Seller",
      value: "seller",
    },
    {
      profile: "seller",
      label: "Transportation / Climate Control",
      value: "transportation_climate_control",
    },
    {
      profile: "seller",
      label: "Wholesale",
      value: "wholesale",
    },
    {
      profile: "vendor",
      label: "Winery",
      value: "winery",
    },
  ],
  previousProfileAttachments: [
    {
      id: "fileName0",
      name: "file name 1",
      size: 12345,
    },
    {
      id: "fileName1",
      name: "file name 2",
      size: 67890,
    },
    {
      id: "fileName2",
      name: "file name 3",
      size: 98765,
    },
    {
      id: "fileName3",
      name: "file name 4",
      size: 54321,
    },
  ],
  productCategories: [
    {
      id: "fruit",
      name: "Fruit",
      products: {
        buyer: ["bananas", "kiwis"],
        seller: ["apples", "pears"],
        vendor: [],
        processor: ["strawberries", "raspberries"],
        service_provider: ["grapes", "mangos"],
      },
    },
    {
      id: "vegetables",
      name: "Vegetables",
      products: {
        buyer: ["carrots", "potatoes"],
        seller: ["tomatoes", "beets"],
        vendor: ["cabbage", "pumpkins"],
        processor: ["lettuce", "radishes"],
        service_provider: ["string beans", "squash"],
      },
    },
    {
      id: "meat",
      name: "Meat and Poultry",
      products: {
        buyer: ["beef", "pork"],
        seller: ["chicken"],
        vendor: ["moose"],
        processor: ["venison"],
        service_provider: ["turkey", "squab"],
      },
    },
    {
      id: "dairyEggs",
      name: "Dairy and Eggs",
      products: {
        buyer: ["cheese", "sour cream"],
        seller: ["eggs", "scrambled eggs"],
        vendor: ["milk", "coffee cream"],
        processor: ["cottage cheese"],
        service_provider: [
          "swiss cheese",
          "mozzarella cheese",
          "grilled cheese sandwiches",
        ],
      },
    },
    {
      id: "fish",
      name: "Fish",
      products: {
        buyer: ["bass", "trout"],
        seller: ["walleye", "pike"],
        vendor: ["catfish"],
        processor: ["eel"],
        service_provider: ["watersnake", "sunfish"],
      },
    },
    {
      id: "preparedFoodCondiments",
      name: "Prepared Food and Condiments",
      products: {
        buyer: ["ketchup"],
        seller: ["relish", "mustard"],
        vendor: ["mayonnaise"],
        processor: ["secret sauce"],
        service_provider: ["tartar sauce", "McChicken sauce"],
      },
    },
    {
      id: "grains",
      name: "Grains",
      products: {
        buyer: ["wheat"],
        seller: ["bulger"],
        vendor: ["quinoa"],
        processor: ["bran"],
        service_provider: ["rye"],
      },
    },
    {
      id: "nutsSeedsHerbs",
      name: "Nuts, Seeds and Herbs",
      products: {
        buyer: ["peanuts", "flax seeds"],
        seller: ["cashews", "sunflower seeds"],
        vendor: ["hazel nuts", "hemp seeds"],
        processor: ["basil", "chives"],
        service_provider: ["oregano", "thyme sprigs"],
      },
    },
    {
      id: "alcoholicBeverages",
      name: "Alcoholic Beverages",
      products: {
        buyer: ["beer", "Rye whisky"],
        seller: ["vodka"],
        vendor: ["Cabernet Sauvignon"],
        processor: ["Russian Imperial Stouts"],
        service_provider: ["Lagers", "Pilsners"],
      },
    },
    {
      id: "nonAlcoholicBeverages",
      name: "Non-Alcoholic Beverages",
      products: {
        buyer: ["Kool-aid"],
        seller: ["iced tea", "Snapple"],
        vendor: [],
        processor: ["bottled water"],
        service_provider: ["Mountain Dew", "Cream Soda"],
      },
    },
    {
      id: "other",
      name: "Other",
      products: {
        buyer: ["candy"],
        seller: ["candy apples"],
        vendor: ["frozen pizzas"],
        processor: ["ice cream"],
        service_provider: ["butter tarts"],
      },
    },
  ],
};

/*
    ALERT: When you're ready to fully test the  incoming props with live data, make:

    • client
    • profile
    • profileRequest
    • publicProfileRequest
    • deleteConnectionRequest

    ...required props. Might even be a good idea to use to dummy data from your own account just to make sure you’ve got an example of the structure of the object. that the component expects.
*/

ProfileHub.propTypes = {
  usersPreviousProfiles: PropTypes.arrayOf(PropTypes.string),

  client: PropTypes.shape({
    username: PropTypes.string,
    user_id: PropTypes.number,
    email: PropTypes.string,
    exp: PropTypes.number,
    token: PropTypes.string,
  }).isRequired,

  profile: PropTypes.shape({
    current: PropTypes.shape({
      id: PropTypes.number,
    }),
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    editing: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
  }).isRequired,

  profileRequest: PropTypes.func.isRequired,
  publicProfileRequest: PropTypes.func.isRequired,
  deleteConnectionRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  client: state.client,
  profile: state.profile,
  messages: state.messages,
});

const connected = connect(mapStateToProps, {
  profileRequest,
  publicProfileRequest,
  deleteConnectionRequest,
  profileFileUploadRequest,
  profileFileDeleteRequest,
  userMessagesRequest,
});

export default connected(ProfileHub);
