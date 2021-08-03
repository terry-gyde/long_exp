import React from "react";
import { FormField } from "@sanity/base/components";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "part:@sanity/base/client";
import { withDocument } from "part:@sanity/form-builder";
import { Card, Grid, Stack, Text, TextInput } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";
import { useId } from "@reach/auto-id"; // hook to generate unique IDs

const MyCustomString = React.forwardRef((props, ref) => {
  const {
    document, // Access whole document from within this component
    type, // Schema information
    value, // Current field value
    readOnly, // Boolean if field is not editable
    placeholder, // Placeholder text from the schema
    markers, // Markers including validation rules
    presence, // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus, // Method to handle focus state
    onBlur, // Method to handle blur state
    onChange, // Method to handle patch events
  } = props;

  // Create Sanity image builder to generate image url from image object returned by sanity api
  const images = document.imageGallery;
  const imageBuilder = imageUrlBuilder(sanityClient);
  const createPreviewImage = (image) => {
    return (
      <img
        src={imageBuilder
          .image(image.asset)
          .height(200)
          .width(200)
          .fit("crop")
          .url()}
        style={{
          margin: "0",
          width: "100%",
        }}
      />
    );
  };

  // Creates a unique ID for our input
  const inputId = useId();

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value; // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()));
    },
    [onChange]
  );

  const handleDragOver = React.useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = React.useCallback((event) => {
    event.preventDefault();

    if (event.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (event.dataTransfer.items[i].kind === "file") {
          let file = event.dataTransfer.items[i].getAsFile();
          console.log(file);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        console.log(JSON.stringify(event.dataTransfer.files[i]));
      }
    }
  }, []);

  return (
    <FormField
      description={type.description} // Creates description from schema
      title={type.title} // Creates label from schema title
      __unstable_markers={markers} // Handles all markers including validation
      __unstable_presence={presence} // Handles presence avatars
      compareValue={compareValue} // Handles "edited" status
      inputId={inputId} // Allows the label to connect to the input field
    >
      <Card padding={[2]} radius={2} shadow={1}>
        <Stack padding={2} space={[3, 3, 4, 5]}>
          <Card
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            padding={[3]}
            border={"true"}
            radius={2}
          >
            <Grid columns={[2, 3, 4, 6]} gap={[3]}>
              {images.map((image) => {
                return (
                  <Card key={image._key}>{createPreviewImage(image)}</Card>
                );
              })}
            </Grid>
          </Card>

          <Card>
            <Stack space={[3]}>
              <Text>Gallery description</Text>
              <TextInput
                id={inputId} // A unique ID for this input
                onChange={handleChange} // A function to call when the input value changes
                value={value} // Current field value
                readOnly={readOnly} // If "readOnly" is defined make this field read only
                placeholder={placeholder} // If placeholder is defined, display placeholder text
                onFocus={onFocus} // Handles focus events
                onBlur={onBlur} // Handles blur events
                ref={ref}
              />
            </Stack>
          </Card>
        </Stack>
      </Card>
    </FormField>
  );
});

MyCustomString.displayName = "MyCustomString";

// Create the default export to import into our schema
export default withDocument(MyCustomString);
