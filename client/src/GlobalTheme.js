import {createMuiTheme} from "@material-ui/core/styles"
import {yellow, grey} from "@material-ui/core/colors"

const theme = createMuiTheme({
    palette: {
        primary:{
          main: yellow[600]
        },
        secondary:{
          main:grey[900]
        }
    }
})

export default theme
