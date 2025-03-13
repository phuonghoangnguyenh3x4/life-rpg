import { Tooltip } from "react-tooltip";
import HeatMap from "@uiw/react-heat-map";
import { format } from "date-fns";
import PropTypes from 'prop-types';

const QuestHeatmap = ({value}) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <HeatMap
        style={{ transform: "scale(1.15)", transformOrigin: "top left"  }}
        value={value}
        width={`740`}
        legendCellSize={0}
        startDate={new Date(`${currentYear}/01/01`)}
        endDate={new Date(`${currentYear}/12/31`)}
        panelColors={[
          "var(--rhm-rect, #262626)",
          "#1e40af",
          "#3b82f6",
          "#93c5fd",
          "#bfdbfe",
        ]}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
        rectRender={(props, data) => {
          if (!data.count) return <rect {...props} />;

          const count = data.count || 0;
          const date = new Date(data.date);
          const dayOfWeek = format(date, "EEEE");
          const formattedDate = format(date, "MMMM d, yyyy");

          const htmlContent = `
          <div style="text-align: center;">
            Completed: ${count} quests<br />
            on ${dayOfWeek} ${formattedDate}
          </div>`;

          return (
            <rect
              {...props}
              data-tooltip-id="my-tooltip"
              data-tooltip-html={htmlContent}
            />
          );
        }}
      />
      <Tooltip id="my-tooltip" />
    </>
  );
};

QuestHeatmap.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default QuestHeatmap;
