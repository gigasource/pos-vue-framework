<script>
  import componentsFactory from '../GCombobox/selectComponentHOC';

  const Autocomplete = componentsFactory('autocomplete', 'GAutocomplete')
  export default Autocomplete;
</script>
<style scoped lang="scss">
	.g-autocomplete ::v-deep {
		.g-tf-append__inner .g-icon:last-child {
			transition: transform 0.4s;
		}

    .bs-tf-inner-input-group {
      flex-wrap: wrap;
    }

    .g-tf__filled:not(.g-tf__outlined) {
      padding-left: 12px;
      padding-bottom: 8px;

      .input {
        align-items: flex-end;
      }

      .g-tf-label.g-tf-label__active {
        transform: translateY(-16px) scale(0.75);
      }

      &:before, &:after {
        margin-left: -12px;
      }

      .g-tf-append__inner {
        align-self: center;
        transform: translateY(4px);
      }
    }

    .g-tf__solo {
      padding-left: 12px;
    }
	}

	.g-autocomplete__active {
		::v-deep .g-tf-append__inner .g-icon.g-icon__arrow:last-child {
			transition: transform 0.4s;
			transform: rotateZ(180deg);
		}
	}
</style>
