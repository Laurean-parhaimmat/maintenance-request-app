# Maintenance Request Application

## Overview

The maintenance request application provides a simple way for residents to report maintenance issues and for maintenance staff to manage and resolve those requests. Residents can submit and track their own requests, while maintenance staff can view and process requests from all residents.

The application is designed for two types of users: **residents/users** and **maintenance staff/administrators**.

## User Experience

After logging in, a resident can see their own maintenance requests and their current status.

The user can select **"Create a New Maintenance Request"** and choose a category:

- Electricity
- Water
- Heating
- Doors/Locks
- Other

The user enters a short title and description and can provide their building address and apartment number.

Once the request is submitted, its status is automatically set to **New**.

## Maintenance Staff

Maintenance staff can see all maintenance requests, including requests with the statuses **New**, **In Progress**, and **Completed**.

The requests displayed to the maintenance user depend on the selected filter. The default filter is **All**.

When a maintenance worker starts working on a request, they change its status to **In Progress**. Once the issue has been fixed, the status is changed to **Completed**.

The resident can see the status changes in their own view.

The maintenance request process is:

**New Maintenance Request → New → In Progress → Completed**

## Main Pages

The application consists of four main pages:

- Login Page
- Home
- New Maintenance Request
- Request Details

### 1. Login Page

The Login Page allows resident users and maintenance users to log into the application.

### 2. Home

The Home page displays different information depending on the user's role.

**Resident:**

- Their maintenance requests
- Status of their requests
- Filtering by status

**Maintenance:**

- All maintenance requests
- Number of requests by status
- Filtering by status

### 3. New Maintenance Request

A form for creating and submitting a new maintenance request.

### 4. Request Details

When selecting a single request, the page displays detailed information about the maintenance request, including its current status.

## Filters

Both resident and maintenance users can filter the maintenance requests displayed on their Home page.

The available filters are:

- **All**
- **New**
- **In Progress**
- **Completed**

The default filter is **All**.

## User Roles

The application uses role-based access to determine what each user can see and do.

A regular user can see their own maintenance requests, while maintenance staff can see all maintenance requests and perform actions such as:

- **Start Processing**
- **Mark as Completed**

## Database

The application uses two main database tables:

- `user` – stores user information
- `maintenance_request` – stores maintenance requests

A maintenance request contains:

- User ID
- Title
- Description
- Category
- Building address
- Apartment number
- Status
- Creation date

Each maintenance request is associated with the user who created it through the User ID.
