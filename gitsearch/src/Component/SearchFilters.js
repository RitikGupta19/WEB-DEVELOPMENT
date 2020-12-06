import React from "react";
import PropTypes from "prop-types";
import {
  MultiDropdownList,
  SingleDropdownRange,
  RangeSlider,
} from "@appbaseio/reactivesearch";
import { Years } from "./Data";

const SearchFilters = ({ currentTopics, setTopics, visible }) => (
  <div className={`flex column filters-container ${!visible ? "hidden" : ""}`}>
    <div className='child m10'>
      <MultiDropdownList
        componentId='language'
        dataField='language.keyword'
        placeholder='Select languages'
        title='Language'
        filterLabel='Language'
        innerClass={{
          title: "multi-title",
          select: "multi-select",
          list: "multi-list",
        }}
      />
    </div>
    <div className='child m10'>
      <MultiDropdownList
        componentId='topics'
        dataField='topics.keyword'
        placeholder='Select topics'
        title='Repo Topics'
        filterLabel='Topics'
        size={1000}
        queryFormat='and'
        value={currentTopics}
        onChange={setTopics}
        innerClass={{
          title: "multi-title",
          select: "multi-select",
          list: "multi-list",
        }}
      />
    </div>
    <div className='child m10'>
      <SingleDropdownRange
        componentId='pushed'
        dataField='pushed'
        placeholder='Repo last active'
        title='Last Active'
        filterLabel='Last Active'
        data={[
          { start: "now-1M", end: "now", label: "Last 30 days" },
          { start: "now-6M", end: "now", label: "Last 6 months" },
          { start: "now-1y", end: "now", label: "Last year" },
        ]}
        innerClass={{
          title: "multi-title",
          select: "multi-select",
          list: "multi-list",
        }}
      />
    </div>
    <div className='child m10'>
      <SingleDropdownRange
        componentId='created'
        dataField='created'
        placeholder='Repo created'
        title='Created'
        filterLabel='Created'
        data={Years}
        innerClass={{
          title: "multi-title",
          select: "multi-select",
          list: "multi-list",
        }}
      />
    </div>
    <div className='child m10'>
      <RangeSlider
        componentId='stars'
        title='Repo Stars'
        dataField='stars'
        range={{ start: 0, end: 300000 }}
        showHistogram={false}
        rangeLabels={{
          start: "0 Stars",
          end: "300K Stars",
        }}
        innerClass={{
          label: "range-label",
        }}
      />
    </div>
    <div className='child m10'>
      <RangeSlider
        componentId='forks'
        title='Repo Forks'
        dataField='forks'
        range={{ start: 0, end: 180500 }}
        showHistogram={false}
        rangeLabels={{
          start: "0 Forks",
          end: "180K Forks",
        }}
        innerClass={{
          label: "range-label",
        }}
      />
    </div>
  </div>
);

SearchFilters.propTypes = {
  currentTopics: PropTypes.arrayOf(PropTypes.string),
  setTopics: PropTypes.func,
  visible: PropTypes.bool,
};

export default SearchFilters;
