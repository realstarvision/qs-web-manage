import React,{useEffect} from 'react';
import { useTheme ,styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{ tableCellClasses } from '@mui/material/TableCell';
import { TableHead } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TableFooter from '@mui/material/TableFooter';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Paper from '@mui/material/Paper';
import './pieTable.scss'



// 自定义头部样式
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        height: '40px' ,
        background: '#F2F3F5',
        border: '1px solid #E5E6EB',
        padding:'10px',
        fontSize: '14px',
        fontFamily: 'PingFang SC-Medium, PingFang SC',
        fontWeight: 500,
      
       
    },
    [`&.${tableCellClasses.body}`]: {
    },
  }));
// 自定义分页样式
  const StyledTablePagination = styled(TablePagination)({
    
        height: '20px ' ,
        boxSizing:'border-box',
        display:'flex',
        overflow:'hidden',
        justifyContent:'end',
        border:'0',
      
    });
//   table列表底部自定义样式(取消原生自带的一些标签)
const defaultText=function (){
  return null}



interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}


// 页码组件
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//   ) => {
//     onPageChange(event, 0);
//   };
// 页码点击事件 点击后退
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
    console.log(event)
  };
// 页码点击事件 点击下一页
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
    console.log(page)
  };

//   const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

  return (
    <Box  className='iconBox'>
        {/* 回到首页 */}
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

<span className='pageBox'>{page+1}</span>
<span className='centerBox'>/</span>
<span className='rowsPerPageBox'>{Math.ceil(rows.length/rowsPerPage)}</span>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      {/* 到最后一页 */}
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </Box>
  );
}
// 列表数据写死
function createData(name: string, calories: number, fat: number,day:string| number,place:number| string) {
  return { name, calories, fat,day,place };
}


const rows = [
    createData('Frozenwwwwwwwwaaaaaaa', 1554459879098765439, 6444444444444444.0,'很疯狂的供史的回顾', 4.34345435345),
    createData('Ice cream sandwicha', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozenaaaaaaaa yoghurt', 155555555555555555555555555555559, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

// table组件
export default function CustomPaginationActionsTable() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
   useEffect(()=>{
    setData([...rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)])
    // console.log(rows.slice(page * 5, page * 5 + 5))
   },[page])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
 
    console.log(newPage+'a')
    console.log(rows.slice(newPage * 5, newPage * 5 + 5))
  };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

  return (
    <Box className='tableBBox' >
    <TableContainer >
      <Table  >
      <TableHead >
          <TableRow className='headerBox'>
            <StyledTableCell  align="left" >设备编号</StyledTableCell>
            <StyledTableCell align="left">Calories</StyledTableCell>
            <StyledTableCell align="left">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="left">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow className='TableCell' >
              <TableCell>
                {row.name+'a'}
              </TableCell>
              <TableCell >
                {row.calories}
              </TableCell>
              <TableCell >
                {row.fat}
              </TableCell>
              <TableCell >
                {row.day}
              </TableCell>
              <TableCell >
                {row.place}
              </TableCell>
            </TableRow>
          ))}
          
          {/* 最后一页数据下面的空白部分 */}
          {emptyRows > 0 && (
            <TableRow style={{ height: 39 * (rowsPerPage-data.length) }}>
              <TableCell colSpan={10} />
            </TableRow>
          )}
        </TableBody>
           
      </Table>
      
    </TableContainer>
    <StyledTablePagination  className='TableFooterPagination' 
              rowsPerPageOptions={[6
                // { label: '', value: -1 }
]}
              colSpan={0}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
            //   onRowsPerPageChange={handleChangeRowsPerPage}
            //   SelectProps={{
            //     inputProps: {
            //       'aria-label': 'rows per page',
            //     },
            //     native: true,
            //   }}
            //  底部按钮点击的组件
            ActionsComponent={TablePaginationActions}
            onPageChange={handleChangePage}
            labelDisplayedRows={defaultText}
            />
    </Box>
  );
}
