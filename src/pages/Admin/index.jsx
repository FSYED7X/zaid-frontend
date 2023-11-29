import { EuroSymbolRounded, VerifiedRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import engine from "./engine";
import MUIDataTable from "mui-datatables";
import { map, replace } from "lodash";

const VisuallyHiddenInput = styled("input")({
  position: "absolute",
  whiteSpace: "nowrap",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  opacity: 0,
  cursor: "pointer",
});

function Admin({ formik, validateBarcode, validating, data }) {
  return (
    <Box p={3}>
      <Grid container>
        <Grid item xs={12} sm={8} lg={3}>
          <Stack spacing={3}>
            <Button
              variant="outlined"
              size="large"
              startIcon={validating ? <CircularProgress size={20} /> : ""}
              sx={{
                border: "2px solid!important",
                borderColor: "inherit",
                width: "100%",
              }}
              color={
                formik.values.barcode && !validating
                  ? "success"
                  : formik.errors.barcode
                  ? "error"
                  : "primary"
              }
              endIcon={
                formik.values.barcode && !validating ? <VerifiedRounded /> : ""
              }
            >
              {validating
                ? "Validating..."
                : formik.values.barcode
                ? `Product Barcode: ${formik.values.barcode}`
                : formik.errors.barcode || "Capture Barcode"}
              <VisuallyHiddenInput
                type="file"
                name="file"
                accept="image/*"
                onChange={validateBarcode}
                value={""}
              />
            </Button>

            <TextField
              type="number"
              fullWidth
              placeholder="Enter Price"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EuroSymbolRounded />
                  </InputAdornment>
                ),
              }}
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && formik.errors.price}
              value={formik.values.price}
              onChange={(event) =>
                formik.setFieldValue("price", event.target.value)
              }
            />

            <Button
              variant="contained"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
              startIcon={
                formik.isSubmitting ? <CircularProgress size={18} /> : ""
              }
            >
              Add New Product
            </Button>
          </Stack>
        </Grid>
      </Grid>

      <Box
        mt={3}
        border={1}
        borderColor="grey.400"
        borderRadius={"8px"}
        overflow={"hidden"}
      >
        <MUIDataTable
          title="Listed Products"
          data={map(data?.Items, (item) => [
            item.image,
            item.name,
            item.brand,
            { code: item.barcode, type: item.barcodeType },
            item.barcode,
            item.price,
          ])}
          columns={[
            {
              name: "Image",
              label: "Image",
              options: {
                customBodyRender: (value) => {
                  return (
                    <img
                      src={value}
                      alt=""
                      style={{
                        height: "70px",
                        width: "100px",
                        objectFit: "contain",
                      }}
                    />
                  );
                },
                setCellProps: (value) => ({ sx: { py: 0 } }),
              },
            },
            "Name",
            "Brand",
            {
              name: "barcode",
              label: "Barcode",
              options: {
                customBodyRender: (value) => {
                  return (
                    <img
                      src={`https://barcode.tec-it.com/barcode.ashx?data=${value.code}&code=${replace(value.type, "_", "")}`}
                      alt=""
                      style={{
                        height: "70px",
                        objectFit: "contain",
                      }}
                    />
                  );
                },
                setCellProps: (value) => ({ sx: { py: 0 } }),
              },
            },
            "Code",
            {
              name: "price",
              label: "Price",
              options: {
                customBodyRender: (value) => {
                  return (
                    <Typography>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "EUR",
                      }).format(value)}
                    </Typography>
                  );
                },
                setCellProps: (value) => ({ sx: { py: 0 } }),
              },
            },
          ]}
          options={{
            selectableRowsHideCheckboxes: true,
            elevation: 0,
          }}
        />
      </Box>
    </Box>
  );
}

export default engine(Admin);
