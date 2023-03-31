import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';
import Avatar from 'components/common/Avatar';
import { isIterableArray } from 'helpers/utils';
import Flex from 'components/common/Flex';
import FalconCloseButton from 'components/common/FalconCloseButton';
// import SoftBadge from 'components/common/SoftBadge';
import { getStyle } from '../TotalOrder';

const MediaSearchContent = ({ item }) => {
  return (
    <Dropdown.Item className="px-x1 py-2" as={Link} to={item.url}>
      <Flex alignItems="center">
        {item.file && (
          <div className="file-thumbnail">
            <img src={item.img} alt="" className={item.imgAttrs.class} />
          </div>
        )}
        {item.icon && (
          <Avatar src={item.icon.img} size="l" className={item.icon.status} />
        )}

        <div className="ms-2">
          <h6 className="mb-0">{item.title}</h6>
          <p
            className="fs--2 mb-0"
            dangerouslySetInnerHTML={{ __html: item.text || item.time }}
          />
        </div>
      </Flex>
    </Dropdown.Item>
  );
};

const SearchBox = ({ autoCompleteItem }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [resultItem, setResultItem] = useState(autoCompleteItem);

  const fuseJsOptions = {
    includeScore: true,
    keys: ['name', 'title']
  };

  let searchResult = new Fuse(autoCompleteItem, fuseJsOptions)
    .search(searchInputValue)
    .map(item => item.item);
  // console.log(searchResult);
  const calendarDates = new Fuse(resultItem, {
    keys: ['title']
  })
    .search(searchInputValue)
    .map(item => item.item);
  //Filters for items with the slug property and no empty searchInput
  const cryptoItems = resultItem.filter(item => {
    if (item.slug && searchInputValue !== '') {
      return item;
    }
  });
  // // console.log('cryptoitems', cryptoItems);
  // const recentlyBrowsedItems = resultItem.filter(
  //   item => item.catagories === 'recentlyBrowsedItems'
  // );

  // const suggestedFilters = resultItem.filter(
  //   item => item.catagories === 'suggestedFilters'
  // );

  // const suggestionFiles = resultItem.filter(
  //   item => item.catagories === 'suggestionFiles'
  // );

  // const suggestionMembers = resultItem.filter(
  //   item => item.catagories === 'suggestionMembers'
  // );

  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (searchInputValue) {
      setResultItem(searchResult);
      isIterableArray(searchResult)
        ? setDropdownOpen(true)
        : setDropdownOpen(false);
    } else {
      setResultItem(autoCompleteItem);
    }

    // eslint-disable-next-line
  }, [searchInputValue]);

  return (
    <Dropdown onToggle={toggle} className="search-box">
      <Dropdown.Toggle
        as="div"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
        bsPrefix="toggle"
      >
        <Form className="position-relative">
          <Form.Control
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="rounded-pill search-input"
            value={searchInputValue}
            onChange={({ target }) => setSearchInputValue(target.value)}
            onClick={() => setDropdownOpen(false)}
          />
          <FontAwesomeIcon
            icon="search"
            className="position-absolute text-400 search-box-icon"
          />
          {searchInputValue && (
            <div
              className="search-box-close-btn-container"
              // style={{ right: '10px', top: '8px' }}
            >
              <FalconCloseButton
                size="sm"
                noOutline
                onClick={() => setSearchInputValue('')}
              />
            </div>
          )}
        </Form>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div className="scrollbar py-3" style={{ maxHeight: '24rem' }}>
          {isIterableArray(cryptoItems) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Crypto Results
              </Dropdown.Header>
              {cryptoItems.map(item => (
                <Dropdown.Item
                  as={Link}
                  to={`https://coinmarketcap.com/currencies/${item.slug}/`}
                  className="fs--1 px-x1 py-1 hover-primary "
                  key={item.id}
                >
                  <Flex alignItems="center " justifyContent={'between'}>
                    <span>
                      <FontAwesomeIcon
                        icon="circle"
                        className="me-2 text-300 fs--2"
                      />
                      <span>{item.name}</span>
                    </span>
                    <Badge
                      pill
                      bg="200"
                      className={
                        getStyle(item.quote.USD.percent_change_1h).text +
                        ' fs--2'
                      }
                    >
                      <FontAwesomeIcon
                        icon={getStyle(item.quote.USD.percent_change_1h).icon}
                        className="me-1"
                      />
                      {parseFloat(item.quote.USD.percent_change_1h).toFixed(2)}%
                    </Badge>
                  </Flex>
                </Dropdown.Item>
              ))}
            </>
          )}

          {isIterableArray(calendarDates) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Calendar Dates
              </Dropdown.Header>
              {calendarDates.map(item => {
                const date = new Date(item.start);

                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const time = date.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                const result = `${day}.${month}. - ${time}`;
                return (
                  <Dropdown.Item
                    as={Link}
                    to={item.url}
                    className="fs--1 px-x1 py-1 hover-primary "
                    key={item.id}
                  >
                    <Flex alignItems="center" justifyContent={'between'}>
                      <div>
                        <FontAwesomeIcon
                          icon="circle"
                          className="me-2 text-300 fs--2"
                        />
                        <span className={item.className + ' px-1 rounded'}>
                          {item.title}
                        </span>
                      </div>
                      <Badge pill bg="200" className="text-black">
                        {result}
                      </Badge>
                    </Flex>
                  </Dropdown.Item>
                );
              })}
            </>
          )}
          {/* {isIterableArray(recentlyBrowsedItems) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Recently Browsed
              </Dropdown.Header>
              {recentlyBrowsedItems.map(item => (
                <Dropdown.Item
                  as={Link}
                  to={item.url}
                  className="fs--1 px-x1 py-1 hover-primary "
                  key={item.id}
                >
                  <Flex alignItems="center">
                    <FontAwesomeIcon
                      icon="circle"
                      className="me-2 text-300 fs--2"
                    />
                    <div className="fw-normal">
                      {item.breadCrumbTexts.map((breadCrumbText, index) => {
                        return (
                          <Fragment key={breadCrumbText}>
                            {breadCrumbText}
                            {item.breadCrumbTexts.length - 1 > index && (
                              <FontAwesomeIcon
                                icon="chevron-right"
                                className="mx-1 text-500 fs--2"
                                transform="shrink 2"
                              />
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </Flex>
                </Dropdown.Item>
              ))}
              {(isIterableArray(suggestedFilters) ||
                isIterableArray(suggestionFiles) ||
                isIterableArray(suggestionMembers)) && (
                <hr className="text-200 dark__text-900" />
              )}
            </>
          )} */}

          {/* {isIterableArray(suggestedFilters) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Suggested Filter
              </Dropdown.Header>
              {suggestedFilters.map(item => (
                <Dropdown.Item
                  as={Link}
                  to={item.url}
                  className="fs-0 px-x1 py-1"
                  key={item.id}
                >
                  <Flex alignItems="center">
                    <SoftBadge
                      bg={item.type}
                      className="fw-medium text-decoration-none me-2"
                    >
                      {item.key}:{' '}
                    </SoftBadge>
                    <div className="flex-1 fs--1">{item.text}</div>
                  </Flex>
                </Dropdown.Item>
              ))}
              {(isIterableArray(suggestionFiles) ||
                isIterableArray(suggestionMembers)) && (
                <hr className="text-200 dark__text-900" />
              )}
            </>
          )}

          {isIterableArray(suggestionFiles) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Files
              </Dropdown.Header>
              {suggestionFiles.map(item => (
                <MediaSearchContent item={item} key={item.id} />
              ))}
              {isIterableArray(suggestionMembers) && (
                <hr className="text-200 dark__text-900" />
              )}
            </>
          )}

          {isIterableArray(suggestionMembers) && (
            <>
              <Dropdown.Header as="h6" className="px-x1 pt-0 pb-2 fw-medium">
                Members
              </Dropdown.Header>
              {suggestionMembers.map(item => (
                <MediaSearchContent item={item} key={item.id} />
              ))}
            </>
          )} */}

          {resultItem.length === 0 && (
            <p className="fs-1 fw-bold text-center mb-0">No Result Found.</p>
          )}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

MediaSearchContent.propTypes = {
  item: PropTypes.shape({
    catagories: PropTypes.string,
    url: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      img: PropTypes.string.isRequired,
      size: PropTypes.string,
      status: PropTypes.string
    }),
    title: PropTypes.string,
    text: PropTypes.string,
    img: PropTypes.string,
    time: PropTypes.string,
    file: PropTypes.bool,
    imgAttrs: PropTypes.shape({
      class: PropTypes.string
    })
  }).isRequired
};

SearchBox.propTypes = {
  autoCompleteItem: PropTypes.arrayOf(
    PropTypes.shape(MediaSearchContent.propTypes.item)
  )
};

export default SearchBox;
