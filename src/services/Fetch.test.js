import { fetchVehicles } from './fetchVehicleData';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {render, waitFor, screen} from "@testing-library/react";
import App from "../App";

describe('fetchVehicles', () => {
    it('returns expected vehicle data', async () => {
        const mockAxios = new MockAdapter(axios);
        const mockData = [
            {
                id: 1,
                regNo: 'testing',
                chassisNo: 'testing'
            },
            {
                "id": 2,
                "regNo": "testing_reg",
                "chassisNo": "testing_chas"
            }
        ];

        // Mock the HTTP GET request to return mockData
        mockAxios.onGet('http://localhost:8080/api/vehicles').reply(200, mockData);

        // Call the fetchVehicles function
        const result = await fetchVehicles();

        // Assert that the result matches the expected mockData
        expect(result).toEqual(mockData);
    });


    it('returns expected empty data', async () => {
        const mockAxios = new MockAdapter(axios);
        const mockData = [
            {
            }
        ];

        // Mock the HTTP GET request to return mockData
        mockAxios.onGet('http://localhost:8080/api/vehicles').reply(200, mockData);

        // Call the fetchVehicles function
        const result = await fetchVehicles();

        // Assert that the result matches the expected mockData
        expect(result).toEqual(mockData);
    });

    it( 'test App component rendering', async () => {

        const mockAdapter = new MockAdapter(axios);

        const mockData = [
            {
                id: 1,
                regNo: 'testing',
                chassisNo: 'testing'
            },
            {
                "id": 2,
                "regNo": "testing_reg",
                "chassisNo": "testing_chas"
            }
        ];

        mockAdapter.onGet("http://localhost:8080/api/vehicles").reply(200, mockData);

        render(<App/>);

        await waitFor(() => {

            const vehicleResult = screen.getByText('2');

            //expect( vehicleResult ).toBeInTheDocument();

            expect( vehicleResult ).toHaveTextContent('testing_chas');

        });

    } )

});
