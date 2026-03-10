#!/bin/bash

# CasaPerks API Test Suite
# Usage: bash test-api.sh
# Prerequisite: server must be running on port 3001

echo "=========================================="
echo "  CasaPerks API Test Suite"
echo "=========================================="
echo ""

# --- Test 1: Health Check ---
echo "--- Test 1: Health Check ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  http://localhost:3001/
echo ""

# --- Test 2: Login (resident-001) ---
echo "--- Test 2: Login (resident-001) ---"
LOGIN_RESPONSE=$(curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"residentId":"resident-001"}' \
  http://localhost:3001/auth/login)
echo "$LOGIN_RESPONSE"

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "(Token captured: ${TOKEN:0:40}...)"
echo ""

# --- Test 3: Login (invalid resident) ---
echo "--- Test 3: Login (invalid resident) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"residentId":"resident-999"}' \
  http://localhost:3001/auth/login
echo ""

# --- Test 4: Login (missing body) ---
echo "--- Test 4: Login (missing body) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:3001/auth/login
echo ""

# --- Test 5: Get resident (authenticated) ---
echo "--- Test 5: Get resident (authenticated) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/residents/resident-001
echo ""

# --- Test 6: Get resident (no token) ---
echo "--- Test 6: Get resident (no token) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  http://localhost:3001/residents/resident-001
echo ""

# --- Test 7: Get resident (wrong resident) ---
echo "--- Test 7: Get resident (wrong resident — token is resident-001, requesting resident-002) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/residents/resident-002
echo ""

# --- Test 8: Get transactions (authenticated) ---
echo "--- Test 8: Get transactions (authenticated) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/residents/resident-001/transactions
echo ""

# --- Test 9: Get gift cards (authenticated) ---
echo "--- Test 9: Get gift cards (authenticated) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/gift-cards
echo ""

# --- Test 10: Redeem (valid, sufficient points) ---
echo "--- Test 10: Redeem gc-001 (valid — resident-001 has 2450 pts, gc-001 costs 500) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"giftCardId":"gc-001"}' \
  http://localhost:3001/residents/resident-001/redeem
echo ""

# --- Test 11: Get resident after redeem (confirm balance updated) ---
echo "--- Test 11: Get resident after redeem (balance should be 1950, not 2450) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/residents/resident-001
echo ""

# --- Test 12: Redeem (out of stock) ---
echo "--- Test 12: Redeem gc-006 (out of stock — Visa card) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"giftCardId":"gc-006"}' \
  http://localhost:3001/residents/resident-001/redeem
echo ""

# --- Test 13: Redeem (insufficient points) ---
echo "--- Test 13: Login as resident-002 (875 pts) then redeem gc-002 (costs 1000) ---"
LOGIN_R002=$(curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"residentId":"resident-002"}' \
  http://localhost:3001/auth/login)
echo "$LOGIN_R002"

TOKEN_R002=$(echo "$LOGIN_R002" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "(Token captured: ${TOKEN_R002:0:40}...)"
echo ""

curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_R002" \
  -d '{"giftCardId":"gc-002"}' \
  http://localhost:3001/residents/resident-002/redeem
echo ""

# --- Test 14: Redeem (invalid gift card id) ---
echo "--- Test 14: Redeem invalid gift card id (gc-999) ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"giftCardId":"gc-999"}' \
  http://localhost:3001/residents/resident-001/redeem
echo ""

# --- Test 15: Redeem (missing giftCardId) ---
echo "--- Test 15: Redeem missing giftCardId ---"
curl -s \
  -w "\nHTTP Status: %{http_code}\n" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{}' \
  http://localhost:3001/residents/resident-001/redeem
echo ""

echo "=========================================="
echo "  Test suite complete"
echo "=========================================="
