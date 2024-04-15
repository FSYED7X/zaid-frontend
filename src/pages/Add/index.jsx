import {
  CategoryOutlined,
  CategoryRounded,
  EuroSymbolRounded,
  ImageOutlined,
  VerifiedRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { Fragment } from "react";
import engine from "./engine";

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

function Add({ formik, validateBarcode, validating, data, deleteProduct }) {
  return (
    <Container>
      <Paper
        sx={{ p: 3, mt: 2, borderRadius: 3, width: "50%", mx: "auto" }}
        elevation={5}
      >
        <Typography
          align="center"
          variant="h5"
          mb={5}
          color="grey.500"
          fontWeight={700}
        >
          <CategoryOutlined sx={{ fontSize: 58 }} />
          <br /> Add New Product
        </Typography>
        <Stack spacing={5}>
          <Button
            variant="outlined"
            size="large"
            sx={{
              border: "2px dashed!important",
              borderColor: "inherit",
              width: "100%",
              display: "block",
            }}
            color={
              formik.values.barcode && !validating
                ? "success"
                : formik.errors.barcode && !validating
                ? "error"
                : "primary"
            }
          >
            {validating && <CircularProgress size={28} thickness={4} />}
            {!validating && !formik.values.barcode && (
              <ImageOutlined fontSize="large" />
            )}
            {formik.values.barcode && <VerifiedRounded fontSize="large" />}

            <br />
            <Box>
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
            </Box>
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
            size="large"
            startIcon={
              formik.isSubmitting ? <CircularProgress size={18} /> : ""
            }
          >
            {formik.isSubmitting ? "Processing..." : "Add New Product"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default engine(Add);
