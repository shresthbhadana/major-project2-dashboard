import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Scale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio : false,
  scales :{
    y:{
      beginAtZero : true,
      grid : {
drawBorder : true,
    }
  },
  x : {
    grid : {
      display : false
    }
  }
},
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Holdings',
    },
  },
};




export function VerticalGraph({data}) {
  return <Bar options={options} data={data} />;
}