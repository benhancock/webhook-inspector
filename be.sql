--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Homebrew)
-- Dumped by pg_dump version 14.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: events; Type: TABLE; Schema: public; Owner: request_bin_be
--

CREATE TABLE public.events (
    id integer NOT NULL,
    url_endpoints_id integer,
    request_info character varying(30),
    time_received bigint
);


ALTER TABLE public.events OWNER TO request_bin_be;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: request_bin_be
--

ALTER TABLE public.events ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: url_endpoints; Type: TABLE; Schema: public; Owner: request_bin_be
--

CREATE TABLE public.url_endpoints (
    id integer NOT NULL,
    endpoint character varying(50),
    user_id integer
);


ALTER TABLE public.url_endpoints OWNER TO request_bin_be;

--
-- Name: url_endpoints_id_seq; Type: SEQUENCE; Schema: public; Owner: request_bin_be
--

ALTER TABLE public.url_endpoints ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.url_endpoints_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: request_bin_be
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(25)
);


ALTER TABLE public.users OWNER TO request_bin_be;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: request_bin_be
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: request_bin_be
--

COPY public.events (id, url_endpoints_id, request_info, time_received) FROM stdin;
152	2	66576ae570933e440a27b9fb	1717005029255
153	2	66576ae570933e440a27b9fe	1717005029404
154	2	66576af870933e440a27ba00	1717005048362
155	2	66576af870933e440a27ba02	1717005048480
\.


--
-- Data for Name: url_endpoints; Type: TABLE DATA; Schema: public; Owner: request_bin_be
--

COPY public.url_endpoints (id, endpoint, user_id) FROM stdin;
1	test	1
2	0cce-217-180-201-58	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: request_bin_be
--

COPY public.users (id, name) FROM stdin;
1	ben
\.


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: request_bin_be
--

SELECT pg_catalog.setval('public.events_id_seq', 155, true);


--
-- Name: url_endpoints_id_seq; Type: SEQUENCE SET; Schema: public; Owner: request_bin_be
--

SELECT pg_catalog.setval('public.url_endpoints_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: request_bin_be
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: request_bin_be
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: url_endpoints url_endpoints_pkey; Type: CONSTRAINT; Schema: public; Owner: request_bin_be
--

ALTER TABLE ONLY public.url_endpoints
    ADD CONSTRAINT url_endpoints_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: request_bin_be
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: events events_url_endpoints_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: request_bin_be
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_url_endpoints_id_fkey FOREIGN KEY (url_endpoints_id) REFERENCES public.url_endpoints(id);


--
-- Name: url_endpoints url_endpoints_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: request_bin_be
--

ALTER TABLE ONLY public.url_endpoints
    ADD CONSTRAINT url_endpoints_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

